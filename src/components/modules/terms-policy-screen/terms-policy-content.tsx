import Text from '@app/components/elements/text';
import colors from '@app/styles/color';
import typography from '@app/styles/typography';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function TermsPolicyContent() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.pt12, styles.pb20, { backgroundColor: colors.white }]}
    >
      <View style={styles.cardContainer}>
        <Text style={typography.title}>{`Welcome to Hotel KiraHeng!`}</Text>
        <Text style={[typography.body, styles.textStyle]}>
          {`These terms and conditions outline the rules and regulations for the use of Hotel's Website, located at KiraHeng.com.`}
        </Text>
        <Text style={[typography.body, styles.textStyle]}>
          {`By accessing this website we assume you accept these terms and conditions. Do not continue to use Hotel KiraHeng if you do not agree to take all of the terms and conditions stated on this page`}
        </Text>
        <Text style={[typography.body, styles.textStyle]}>
          {`The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.`}
        </Text>
        <Text style={[typography.title, styles.mt12]}>{`Cookies`}</Text>
        <Text style={[typography.body, styles.textStyle]}>
          {`We employ the use of cookies. By accessing Hotel KiraHeng, you agreed to use cookies in agreement with the Hotel's Privacy Policy.`}
        </Text>
        <Text style={[typography.body, styles.textStyle]}>
          {`Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.`}
        </Text>
        <Text style={[typography.title, styles.mt12]}>{`License`}</Text>
        <Text style={[typography.body, styles.textStyle]}>
          {`Unless otherwise stated, Hotel and/or its licensors own the intellectual property rights for all material on Hotel KiraHeng. All intellectual property rights are reserved. You may access this from Hotel KiraHeng for your own personal use subjected to restrictions set in these terms and conditions.`}
        </Text>
        <Text style={[typography.body, styles.textStyle]}>
          {`This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the Free Terms and Conditions Generator.`}
        </Text>
        <Text style={[typography.body, styles.textStyle]}>
          {`Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Hotel does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Hotel,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Hotel shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.`}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pt12: {
    paddingTop: 12,
  },
  pb20: {
    paddingBottom: 20,
  },
  cardContainer: {
    paddingHorizontal: 12,
  },
  textStyle: {
    marginTop: 12,
    textAlign: 'justify',
  },
  mt12: {
    marginTop: 12,
  },
});
