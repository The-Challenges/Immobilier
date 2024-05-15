import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, Pressable, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import Feather from 'react-native-vector-icons/Feather';
import { Surface } from 'react-native-paper';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import { LineChart,BarChart,PieChart,ProgressChart,ContributionGraph,StackedBarChart} from "react-native-chart-kit";
import StatisticsComponent from '../../screens/Profile/Statistics';

const Action = ({ icon, title }) => {
  return (
    <View style={styles.action}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.iconContainer}>
          <Icon name={icon} size={23} color={'white'} />
        </View>
        <Text style={styles.actionTitle}>{title}</Text>
      </View>
      <Icon name={'chevron-right'} size={25} color={'#15273F'} />
    </View>
  );
}

const UserProfile = ({ navigation }) => {
  const profileImage = require("../../images/aaa.png");
  const fullname = "Mohamad Salah";
  const useremail = "mohamadsalah02@gmail.com";
  const number = "+ 216 28153955";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Background Image */}
        <Image
          source={require('../../images/pla.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        {/* White overlay for the second half of the page */}
        <View style={styles.overlay} />
        {/* Content */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Surface style={styles.header}>
            <View style={{ marginLeft: 20 }}>
              <Feather
                name='arrow-left'
                size={25}
                style={{ color: '#15273F' }}
                onPress={navigation.goBack}
              />
            </View>
            <Text style={styles.headerText}>Account</Text>
            <View style={{ marginRight: 20 }}>
              <Pressable>
                <Feather
                  name='share-2'
                  size={25}
                  style={{ color: '#15273F' }}
                />
              </Pressable>
            </View>
          </Surface>

          <View style={styles.profileInfo}>
            <View style={styles.imageContainer}>
              <Image source={profileImage} style={styles.profileImageStyle} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.accountTitle}>{fullname}</Text>
              <Text style={styles.userInfo}>{useremail}</Text>
              <Text style={styles.userInfo}>{number}</Text>
            </View>
          </View>

          <View style={styles.line}></View>

          <Pressable onPress={() => navigation.navigate("Apartment")}>
            <Action title={'Listings'} icon={'edit'} />
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Contact")}>
            <Action title={'Contact'} icon={'edit-location'} />
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Notifications")}>
            <Action title={'Notifications'} icon={'notifications'} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("StatisticsComponent")}>
            <Action title={'Statistics'} icon={'notifications'} />
          </Pressable>

          <Action title={'Edit Profile'} icon={'help'} />

         
          
          

          <Pressable onPress={() => navigation.navigate("profile")}>
            <Action title={'Logout'} icon={'logout'} />
          </Pressable>
          <StatisticsComponent/>
          

          {/* <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Version: 0.0.1</Text>
          </View> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // Ensure the background image stays in the back
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5, // Adjust the opacity as needed
  },
  overlay: {
    position: 'absolute',
    top: '35%', // Start the overlay from the middle of the screen
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white', // Overlay color
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    height: 50,
    elevation: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#15273F',
  },
  profileInfo: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageStyle: {
    height: 115,
    width: 115,
    borderRadius: 60,
  },
  textContainer: {
    marginLeft: 20,
  },
  accountTitle: {
    fontFamily: "sans-serif-condensed",
    fontSize: 20,
    fontWeight: '600',
    color: "#15273F",
  },
  userInfo: {
    fontFamily: 'sans-serif-medium',
    fontSize: 17,
    color: 'gray',
    marginTop: 5,
  },
  action: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#15273F',
    justifyContent: "center",
    alignItems: 'center',
  },
  actionTitle: {
    marginLeft: 19,
    fontSize: 21,
    color: "#15273F",
  },
  line: {
    height: 3,
    backgroundColor: 'lightgray',
    marginVertical: 25,
  },
  versionContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  versionText: {
    fontSize: 18,
    fontFamily: 'sans-serif-light',
  },
});

export default UserProfile;
