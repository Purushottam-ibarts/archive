import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking, Pressable } from 'react-native';
import PageLayout from '../layouts/page-layout/page-layout';
import { ScrollView } from 'react-native-gesture-handler';

export const TeamMember: React.FC<{ name: string, description: string, imageUri: any, longDescription: string }> = ({ name, description, imageUri, longDescription }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Pressable style={styles.card}>
      <Image source={imageUri} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.descriptionCard}>
        {isExpanded ? longDescription : description}
      </Text>
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={styles.readMore}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </Text>
      </TouchableOpacity>
    </Pressable>
  );
};

const PrivacyScreen = () => {
  
  const Header = () => {
    return (
        <Pressable style={styles.headerContainer}>
            <Text style={styles.title}>Privacy Policy</Text>
            <ScrollView>
                <Text style={styles.description}>
                    Your privacy is important to us. It is Dentistry in a Nutshell policy to respect your privacy regarding any information we may collect from you across our website, https://dentistryinanutshell.com, and other sites we own and operate.

                    We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.

                    We collect this information:

                    Directly from you when you provide it to us, and/or;
                    Automatically as you navigate through our Services (information collected automatically may include usage details, IP addresses and information collected through cookies and other tracking technologies).
                    We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.

                    We don’t share any personally identifying information publicly or with third-parties, except when required to by law.

                    Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.

                    You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.

                    Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.

                    This policy is effective as of 15 September 2022.

                    What about Cookies?

                    We, and third-parties with whom we partner, may use cookies, web beacons, tags, scripts, local shared objects, such as HTML5 and Flash, advertising identifiers and similar technology to passively collect non-personally identifiable information about you, in connection with your use of the Service, third-party websites, and mobile applications.

                    Cookies and other tracking information can help to customise the Website for visitors and are useful for gathering information such as browser type and operating system, tracking the number of visitors to the Website, and understanding how visitors use the Website, and build up a demographic profile.

                    There are three types of cookies:

                    Website functionality cookies
                    These cookies enable you to browse the Website and use our features such as using a registered account.

                    Website analytics cookies
                    We use these cookies to measure and analyse how our visitors use the Website. This allows us to continuously improve our Website.

                    Customer preference cookies
                    When browsing, the Website will remember the preferences you make (i.e. login, language or location). This makes your browsing experience simpler, easier and customised to you.

                    Personal information cannot be collected via cookies or other tracking technology. However, if you have previously provided personal identifiable information, cookies may be tied to such information.

                    If you want to delete any cookies that are already on your computer, please refer to the help and support area on your internet browser for instructions on how to locate the file or directory that stores cookies. Please note that by deleting our cookies or disabling future cookies, you may not be able to access certain areas or features of our site.

                    Who do we disclose your information to?

                    Dentistry in a Nutshell seeks to ensure full transparency about who your personal information may be shared with. We believe that respecting your confidentiality is integral in maintaining our relationship with you. However, there are certain circumstances in which it may be necessary to disclose personal information about to, as follows:

                    Amongst our internal team at Dentistry in a Nutshell, and any of our parent companies, subsidiaries, joint-venture, or any other companies under our common control as defined in section 1159 of the UK Companies Act 2006, in order to effectively manage and maintain your registered account and provide the Service to you. In which case, we will require them to honour this Privacy Policy;
                    To any suppliers and subcontractors in order to fulfill the Service, such as credit card processing services, order fulfillment, analytics, website management, information technology and related infrastructure provision, customer service, auditing, and other similar services, we may share some of your personal information to such third-party but only that which is limited to perform their specific function and are not permitted to share or use the information for any other purpose;
                    Should Dentistry in a Nutshell sell or buy any business or assets, in which case we may disclose your personal data to the prospective seller or buyer of such business or assets. If the company or substantially all of its assets are acquired by a third party, in which case personal data held by it about its customers will be one of the transferred assets;
                    Where there is a legal obligation to do so, to any relevant credit reference agencies, public authorities or law enforcement agencies, including for example where we suspect you have committed a criminal offence, or we suspect fraud where required by law, regulation or legal proceedings;
                    In the good faith belief, if we feel that disclosure of your personal information is necessary to protect and defend the rights or property of Dentistry in a Nutshell , or to act in urgent circumstances to protect the personal safety of the User(s) of the Service or the public. In any such event, where elect to disclose any of your personal information to a third-party, this is done on a strictly case-by-case basis to ensure we comply with UK Data Protection legislation;
                    To permit selected third parties to use your data, to provide you with information about goods and services which may be of interest to you and they may contact you about these by email or telephone. This may also include social media platforms (including Facebook) where we provide limited information about our users (e.g. their email addresses) to the social media platform so they can provide to us an anonymous demographic profile of our users with profiles on that platform to inform our targeted marketing activities on that platform If you do not want us to use your data in this way, or to pass your details on to third parties for marketing purposes, please tick the relevant box situated on the form or webpage on which we collect your data. Your interactions with social media companies, however, are solely and exclusively governed by their privacy policies and we suggest you read the privacy policies on or applicable to all such third-party services;
                    We may also share your information in any other circumstances where we have your express consent.
                    Where do we store and safeguard your personal data?

                    Dentistry in a Nutshell shall take all steps reasonably necessary to ensure that any personal information that we process, in accordance with this privacy policy, is safeguarded through the following:

                    We have implemented appropriate physical, electronic, and managerial procedures to safeguard and help prevent unauthorised access to your information and to maintain data security. These safeguards aim to protect the sensitivity of the information that we collect, process and store and the current state of technology of your personal information that is submitted to us, both during transmission and once we receive it. All information that you provide to us via website and through any other means is stored on our secured servers;
                    This can only be accessed by limited personnel of Dentistry in a Nutshell to supply you with the above Service. It may also be made accessible to staff and subcontractors outside our offices who work with us to assist in providing the Service to you. In each case, we will ensure that these third- parties are only provided with access of your personal information, where it is in our legitimate interests to do so, since we may not have the capabilities to provide these services ourselves;
                    Should you engage in any aspect of our Service which requires you to provide any form of payment in exchange for any of the services/goods, we do not share your credit/debit card information to third-parties. We do not store your payment or credit/debit card information on our internal servers, nor are they stored in physical form. We use a secured third-party service to process payments. When taking payments, we encrypt your payment information via secure socket layer protection (SSL) to protect it from unauthorised use;
                    We assume no liability or responsibility for disclosure of your information due to errors in transmission, unauthorised third-party access, or other causes beyond our control. You also play an important role in keeping your personal information secure.

                    Unfortunately, no data transmission over the Internet, e-mail or data storage system can be guaranteed to be fully secure and error-free. Although we strive to protect your personal data, we cannot ensure or warrant the security of any information you transmit to us through or in connection with the Website or that is stored by us.

                    Please note that email is not encrypted and is NOT a secure means of transmitting credit or debit card information. We will NEVER request sensitive information over email.

                    How long will we retain your data for?

                    In compliance with current GDPR laws, we will only retain your personal data for as long as is necessary for the purposes described in this privacy policy.

                    This means that the retention periods will vary according to the type of the data and the reason that we have the data in the first place. For example, some transaction data will be kept for a number of years in order to comply with various finance and tax related legal obligations.

                    Other transaction data may be kept for a different period because it is in our legitimate interests to do so in order to provide appropriate customer service.

                    Can I delete my account?

                    You have the right to deactivate your account by following the steps under your account settings. If you have any problems, please contact us at team@dentistryinanutshell.com. We will either delete your personal information or de-identify it so that it is anonymous and not attributed to your identity. For example, we may retain information to prevent, investigate, or identify possible wrongdoing in connection with the Service or to comply with legal obligations, but we may retain information about you for the purposes authorised under this Privacy Policy unless prohibited by law.

                    Can I access and change the information that Dentistry in a Nutshell holds about me?

                    You have the legal right to make a Subject Access Request to us to retrieve the personal information we hold about you. This may be subject to a small administrative fee to enable us to respond to your request promptly, within the prescribed 30 days from the date of validation of your request.

                    You may also ask us to correct or remove information you think is inaccurate. In addition, you further have the right to ask us not to process your personal data for marketing purposes. We will usually inform you (before collecting your data) if we intend to use your data for such purposes or if we intend to disclose your information to any third party for such purposes. You can exercise your right to prevent such processing by checking certain boxes on the forms we use to collect your data.

                    You can also exercise these rights at any time by contacting us at dianretailteaml@gmail.com.

                    Functionality aspects of the platform.

                    Our Privacy Policy regarding the use of patient notes functionality states that when you transfer notes from your device to the computer, the data will be stored on our platform for a period of 24 hours, after which it will be promptly removed. Rest assured, we prioritize the security and confidentiality of your data during this process.

                    Changes to our Privacy Policy

                    At times, it may be necessary for us to make occasional updates or modifications to this statement. We reserve the right to update or modify this Privacy Policy without prior notice, and therefore encourage you to review this Privacy Policy periodically so that you are fully aware of your rights and our obligations and practices in accordance with the applicable UK data protection regulatory provisions.

                    Your continued engagement in our Service, after any changes or revisions to this Privacy Policy, shall indicate that you accept such revisions pursuant to this.

                    How can you contact us?

                    If you have any questions or comments regarding this Privacy Policy, or relevant subject matters, you can contact us at dianretailteam@gmail.com
                </Text>
            </ScrollView>
        </Pressable>
    )
  }

  return (
    <PageLayout
      containerStyles={styles.container}
      flatList={{
        data: [1],
        keyExtractor: (item, index) => `${item.name}_${index}`,
        numColumns: 1,
        renderItem: ({ item, index }) => { 
            return <Header />
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
  },
  headerContainer: {
    marginBottom: 20,
    // marginLeft:5,
    marginTop: 11,
    marginRight: 2,
  },
  title: {
    fontSize: 28,
    color: '#D9AA59',
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginVertical: 10,
  },
  description: {
    fontSize: 15,
    color: '#ccc',
    marginVertical: 2,
    lineHeight: 20,
  },
  descriptionEnd: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 5,
    lineHeight: 24,
  },
  joinButton: {
    marginBottom: 11,
    backgroundColor: '#FFC107',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '44%',
    textAlign:'center',
    justifyContent:'center',
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
    textAlign:'center',
  },
  card: {
    backgroundColor: '#102335',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFC107',
    marginTop: 10,
  },
  descriptionCard: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
  },
  readMore: {
    fontSize: 14,
    color: '#FFC107',
    marginTop: 5,
  },
});

export default PrivacyScreen;

