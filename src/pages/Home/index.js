import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  React,
  useEffect,
  useState
} from '@libraries';
import { CatagoryMasalah, Gap, HomeProfile, List } from '@components';
import { colors, fonts, getData, routeConstant } from '@utils';
import { ILNullPhoto } from '@assets';
import { getMasalahPopuler } from '@services';

const Home = ({ navigation }) => {
  const [categoryMasalah] = useState([
    { id: 'akademik', name: 'Akademik' },
    { id: 'keuangan', name: 'Keuangan' },
    { id: 'bimbingan', name: 'Bimbingan' }
  ]);
  const [masalahPopuler, setMasalahPopuler] = useState([]);
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    idNumber: ''
  });

  useEffect(() => {
    getTopRatedMasalah();
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
      getTopRatedMasalah();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const getTopRatedMasalah = () => {
    getMasalahPopuler()
      .then(data => {
        setMasalahPopuler(data);
      })
      .catch(() => {});
  };

  const getUserData = () => {
    getData('user').then(res => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? { uri: res.photo } : ILNullPhoto;
      setProfile(res);
    });
  };

  const renderWelcome = function () {
    const text =
      profile.role && profile.role.toLowerCase() === 'kajur'
        ? 'Kategori Masalah'
        : 'Mau konsultasi apa hari ini?';
    return <Text style={styles.welcome}>{text}</Text>;
  };

  const renderCategory = function () {
    const text =
      profile.role && profile.role.toLowerCase() === 'kajur'
        ? 'Masalah'
        : 'Saya diskusi';

    return (
      <View style={styles.category}>
        {categoryMasalah.map(category => {
          return (
            <View key={category.id} style={styles.categoryRow}>
              <CatagoryMasalah
                key={category.id}
                id={category.id}
                name={category.name}
                label={text}
                onPress={() =>
                  navigation.navigate(routeConstant.CHOOSEMASALAH, { category })
                }
              />
            </View>
          );
        })}
      </View>
    );
  };

  // console.log('profile', profile);
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile
              profile={profile}
              onPress={() =>
                navigation.navigate(routeConstant.USERPROFILE, profile)
              }
            />
            {renderWelcome()}
          </View>
          {renderCategory()}
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Konsultasi terbanyak</Text>
          </View>
          {masalahPopuler.length > 0 ? (
            <React.Fragment>
              {masalahPopuler.map((item, index) => {
                if (index < 9) {
                  return (
                    <List
                      key={item.id}
                      name={item.title}
                      desc={`${item.categoryName} - ${item.rate} konsultasi`}
                      type="next"
                      icon="rate"
                      onPress={() =>
                        navigation.navigate(routeConstant.DETAILMASALAH, {
                          category: {
                            id: item.categoryId,
                            name: item.categoryName
                          },
                          itemMasalah: {
                            ...item
                          }
                        })
                      }
                    />
                  );
                }

                return null;
              })}
            </React.Fragment>
          ) : (
            <Text style={styles.empty}>Belum ada konsultasi</Text>
          )}
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  wrapperSection: { paddingHorizontal: 16 },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209
  },
  category: { flexDirection: 'row', paddingHorizontal: 8 },
  categoryRow: {
    width: '33.333333%',
    paddingHorizontal: 8
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16
  },
  empty: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 16,
    opacity: 0.3
  }
});
