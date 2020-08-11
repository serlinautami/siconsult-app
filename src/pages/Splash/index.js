import { StyleSheet, Text, View, useEffect, React, auth } from '@libraries';
import { ILLogo } from '@assets';
import { colors, fonts, routeConstant, getData } from '@utils';

const Splash = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setTimeout(() => {
        if (user) {
          getData('user')
            .then(userData => {
              const { role } = userData;

              return navigation.reset({
                index: 0,
                routes: [
                  {
                    name: routeConstant.DASHBOARD,
                    params: {
                      isAdmin:
                        role && role.toLowerCase() === 'kajur' ? true : false
                    }
                  }
                ]
              });
            })
            .catch(err => {
              console.log(err);
              return navigation.reset({
                index: 0,
                routes: [
                  {
                    name: routeConstant.GETSTARTED
                  }
                ]
              });
            });
        } else {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: routeConstant.GETSTARTED
              }
            ]
          });
        }
      }, 3000);
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>SI Consult</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 20
  }
});
