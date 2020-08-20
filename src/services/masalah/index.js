import { moment, Alert, database } from '@libraries';
import { showLoading } from '@modules';
import { showError, showSuccess } from '@utils';
import { getUserByUid } from '../authentication';

const getDetailCategory = function (key) {
  switch (key) {
    case 'akademik':
      return {
        id: key,
        name: 'Akademik'
      };
    case 'bimbingan':
      return {
        id: key,
        name: 'Bimbingan'
      };
    case 'keuangan':
      return {
        id: key,
        name: 'Keuangan'
      };
    default:
      return null;
  }
};

export const getAllMasalah = async function () {
  try {
    const snapshot = await database().ref('categoryMasalah').once('value');
    return snapshot.val();
  } catch (err) {
    throw err;
  }
};

export const getMasalahByCategory = async function (category) {
  try {
    const snapshot = await database()
      .ref(`categoryMasalah/${category}`)
      .orderByChild('title')
      .once('value');

    let data = [];
    if (!snapshot.val()) {
      return data;
    }

    data = Object.keys(snapshot.val()).map(function (key) {
      return {
        ...snapshot.val()[key]
      };
    });

    return data;
  } catch (err) {
    showError(err.message);
  }
};

export const getMasalahById = async function (
  category = '',
  id = '',
  params = {}
) {
  try {
    const snapshot = await database()
      .ref(`categoryMasalah/${category}/${id}`)
      .orderByChild('title')
      .once('value');

    if (!snapshot.val()) {
      return null;
    }

    return {
      ...snapshot.val(),
      ...params
    };
  } catch (err) {
    // showError(err.message);
  }
};

export const createMasalah = async function (category, payload = {}) {
  try {
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const unixTimestamp = moment().format('x');
    const requestPayload = {
      id: unixTimestamp,
      createdAt,
      updatedAt: createdAt,
      rate: 0,
      ...payload
    };

    showLoading(true);
    await database()
      .ref(`categoryMasalah/${category}/${requestPayload.id}`)
      .set(requestPayload);
    showLoading(false);
    showSuccess('Data berhasil di simpan!');
    return true;
  } catch (err) {
    showLoading(false);
    showError(err.message);
    throw err;
  }
};

export const editMasalah = async function (
  category,
  masalahId = null,
  payload = {}
) {
  try {
    if (!masalahId) {
      showError('Missing Id, Please reload app!');
      throw { message: 'Missing Id, Please reload app!' };
    }

    const updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const requestPayload = {
      updatedAt,
      ...payload
    };

    showLoading(true);
    await database()
      .ref(`categoryMasalah/${category}/${masalahId}`)
      .update(requestPayload);
    showLoading(false);
    showSuccess('Data berhasil di simpan!');
    return true;
  } catch (err) {
    showLoading(false);
    showError(err.message);
    throw err;
  }
};

export const deleteMasalah = async function (category, masalahId = null) {
  try {
    showLoading(true);
    await database().ref(`categoryMasalah/${category}/${masalahId}`).remove();
    Alert.alert('Berhasil', 'Data berhasil dihapus!', [{ text: 'OK' }], {
      cancelable: false
    });
    showLoading(false);
    return true;
  } catch (err) {
    showError(err.message);
    showLoading(false);
    throw err;
  }
};

export const getMasalahPopuler = async function () {
  const sorted = o => {
    const listData = o;
    const sortedData = listData.sort((a, b) => {
      return b.rate - a.rate;
    });

    return sortedData;
  };

  const filtered = o => {
    const listData = o;
    const filterData = listData.filter(a => {
      return a.rate > 0;
    });

    return filterData;
  };

  try {
    const listMasalah = await getAllMasalah();

    if (!listMasalah) {
      return [];
    }

    let data = [];
    Object.keys(listMasalah).forEach(listKey => {
      const { name, id } = getDetailCategory(listKey);

      Object.keys(listMasalah[listKey]).forEach(itemKey => {
        const item = {
          ...listMasalah[listKey][itemKey],
          categoryName: name,
          categoryId: id
        };
        data.push(item);
      });
    });

    data = filtered(data);
    data = sorted(data);
    return data;
  } catch (err) {
    throw err;
  }
};

const createReportData = function ({
  reportId,
  reportName,
  userId,
  categoryId,
  createdAt,
  updatedAt,
  timestamp,
  masalahId
}) {
  return {
    reportId,
    reportName,
    createdAt,
    updatedAt,
    timestamp,
    count: 1,
    reportedCategory: {
      [categoryId]: {
        count: 1,
        id: categoryId,
        users: {
          [userId]: {
            uid: userId,
            count: 1
          }
        }
      }
    },
    reportedMasalah: {
      [masalahId]: {
        categoryId,
        id: masalahId,
        count: 1,
        users: {
          [userId]: {
            uid: userId,
            count: 1
          }
        }
      }
    },
    reportedUsers: {
      [userId]: {
        uid: userId,
        count: 1
      }
    }
  };
};

const updateReportData = function ({
  userId,
  categoryId,
  updatedAt,
  masalahId,
  reportedMasalah,
  reportedUsers,
  reportedCategory,
  count
}) {
  return {
    updatedAt,
    count,
    reportedCategory: {
      ...reportedCategory,
      [categoryId]: {
        ...(reportedCategory[categoryId]
          ? {
              ...reportedCategory[categoryId],
              count: reportedCategory[categoryId].count + 1,
              users: {
                ...reportedCategory[categoryId].users,
                [userId]: {
                  ...(reportedCategory[categoryId].users[userId]
                    ? {
                        ...reportedCategory[categoryId].users[userId],
                        count:
                          reportedCategory[categoryId].users[userId].count + 1
                      }
                    : {
                        uid: userId,
                        count: 1
                      })
                }
              }
            }
          : {
              count: 1,
              id: categoryId,
              users: {
                [userId]: {
                  uid: userId,
                  count: 1
                }
              }
            })
      }
    },
    reportedMasalah: {
      ...reportedMasalah,
      [masalahId]: {
        ...(reportedMasalah[masalahId]
          ? {
              ...reportedMasalah[masalahId],
              count: reportedMasalah[masalahId].count + 1,
              users: {
                ...reportedMasalah[masalahId].users,
                [userId]: {
                  ...(reportedMasalah[masalahId].users[userId]
                    ? {
                        ...reportedMasalah[masalahId].users[userId],
                        count:
                          reportedMasalah[masalahId].users[userId].count + 1
                      }
                    : {
                        uid: userId,
                        count: 1
                      })
                }
              }
            }
          : {
              categoryId,
              id: masalahId,
              count: 1,
              users: {
                [userId]: {
                  uid: userId,
                  count: 1
                }
              }
            })
      }
    },
    reportedUsers: {
      ...reportedUsers,
      [userId]: {
        ...(reportedUsers[userId]
          ? {
              ...reportedUsers[userId],
              count: reportedUsers[userId].count + 1
            }
          : {
              uid: userId,
              count: 1
            })
      }
    }
  };
};

export const createReport = async ({ userId, categoryId, masalahId }) => {
  try {
    const today = moment();
    const day = today.format('DD');
    const month = today.format('MM');
    const year = today.format('YYYY');
    const timestamp = today.format('x');
    const createdAt = today.format('YYYY-MM-DD HH:mm:ss');
    const updatedAt = today.format('YYYY-MM-DD HH:mm:ss');
    const DAILY = 'daily';
    const MONTHLY = 'monthly';
    const YEARLY = 'yearly';

    // get daily
    const existingDaily = await database()
      .ref(`reports/${DAILY}/${day}-${month}-${year}`)
      .once('value');

    if (existingDaily.val()) {
      const updateDailyPayload = updateReportData({
        userId,
        categoryId,
        updatedAt,
        masalahId,
        reportedMasalah: existingDaily.val().reportedMasalah,
        reportedUsers: existingDaily.val().reportedUsers,
        reportedCategory: existingDaily.val().reportedCategory,
        count: existingDaily.val().count + 1
      });

      await database()
        .ref(`reports/${DAILY}/${day}-${month}-${year}`)
        .update(updateDailyPayload);
    } else {
      const dailyPayload = createReportData({
        reportId: `${DAILY}-${day}-${month}-${year}-${timestamp}`,
        reportName: `Laporan Tanggal ${day}/${month}/${year}`,
        userId,
        categoryId,
        createdAt,
        updatedAt,
        timestamp,
        masalahId
      });
      await database()
        .ref(`reports/${DAILY}/${day}-${month}-${year}`)
        .set(dailyPayload);
    }

    // get monthly
    const existingMonthly = await database()
      .ref(`reports/${MONTHLY}/${month}-${year}`)
      .once('value');

    if (existingMonthly.val()) {
      const updateMonthlyPayload = updateReportData({
        userId,
        categoryId,
        updatedAt,
        masalahId,
        reportedMasalah: existingMonthly.val().reportedMasalah,
        reportedUsers: existingMonthly.val().reportedUsers,
        reportedCategory: existingMonthly.val().reportedCategory,
        count: existingMonthly.val().count + 1
      });

      await database()
        .ref(`reports/${MONTHLY}/${month}-${year}`)
        .update(updateMonthlyPayload);
    } else {
      const monthlyPayload = createReportData({
        reportId: `${MONTHLY}-${month}-${year}-${timestamp}`,
        reportName: `Laporan Bulan ${month}/${year}`,
        userId,
        categoryId,
        createdAt,
        updatedAt,
        timestamp,
        masalahId
      });

      await database()
        .ref(`reports/${MONTHLY}/${month}-${year}`)
        .set(monthlyPayload);
    }

    // get yearly
    const existingYearly = await database()
      .ref(`reports/${YEARLY}/${year}`)
      .once('value');

    if (existingYearly.val()) {
      const updateYearlyPayload = updateReportData({
        userId,
        categoryId,
        updatedAt,
        masalahId,
        reportedMasalah: existingYearly.val().reportedMasalah,
        reportedUsers: existingYearly.val().reportedUsers,
        reportedCategory: existingYearly.val().reportedCategory,
        count: existingYearly.val().count + 1
      });

      await database()
        .ref(`reports/${YEARLY}/${year}`)
        .update(updateYearlyPayload);
    } else {
      const yearlyPayload = createReportData({
        reportId: `${YEARLY}-${year}-${timestamp}`,
        reportName: `Laporan Tahun ${year}`,
        userId,
        categoryId,
        createdAt,
        updatedAt,
        timestamp,
        masalahId
      });
      await database().ref(`reports/${YEARLY}/${year}`).set(yearlyPayload);
    }
  } catch (err) {
    throw err;
  }
};

export const getReportByType = async function (type = '') {
  try {
    const snapshot = await database().ref(`reports/${type}`).once('value');

    let data = [];

    if (snapshot.val()) {
      data = Object.keys(snapshot.val()).map(key => ({
        ...snapshot.val()[key],
        reportKey: key
      }));
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const getReportById = async function (type = '', id = '') {
  try {
    showLoading(true);
    const snapshot = await database()
      .ref(`reports/${type}/${id}`)
      .once('value');

    let data = null;

    if (snapshot.val()) {
      data = snapshot.val();

      // map user
      data.reportedUsers = Object.keys(data.reportedUsers).map(userId => {
        const userData = getUserByUid(userId, {
          ...data.reportedUsers[userId]
        });
        return userData;
      });
      data.reportedUsers = await Promise.all(data.reportedUsers);

      // map masalah
      data.reportedMasalah = Object.keys(data.reportedMasalah).map(
        masalahId => {
          const resData = getMasalahById(
            data.reportedMasalah[masalahId].categoryId,
            masalahId,
            {
              ...data.reportedMasalah[masalahId]
            }
          );
          return resData;
        }
      );

      data.reportedMasalah = await Promise.all(data.reportedMasalah);

      data.reportedMasalah = data.reportedMasalah.map(async item => {
        let resData = Object.keys(item.users).map(uid => {
          const res = getUserByUid(uid, {
            ...item.users[uid]
          });

          return res;
        });

        resData = await Promise.all(resData);
        item.users = resData;

        return item;
      });

      data.reportedMasalah = await Promise.all(data.reportedMasalah);
    }
    showLoading(false);
    return data;
  } catch (err) {
    showLoading(false);
    showError(err.message);
    throw err;
  }
};
