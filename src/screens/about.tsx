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

const AboutScreen = () => {
  const [teamMembers] = useState([
    {},
    {
      name: 'Dr. Raabiha Maan',
      imageUri: require('../assets/images/drRabiha.png'),
      description: 'BDS (Hons) Postgraduate Diploma in Restorative and Aesthetic Dentistry Dr Raabiha graduated with BDS honours from Barts and the London School of Medicine and Dentistry in 2014.',
      longDescription: 'BDS (Hons) Postgraduate Diploma in Restorative and Aesthetic Dentistry Dr Raabiha graduated with BDS honours from Barts and the London School of Medicine and Dentistry in 2014. Soon after qualifying she went on to become one of the youngest Dental Foundation Trainers, for the North East London scheme. She is also a clinical mentor to international dentists coming to work in the UK. Dr Raabiha is a practice owner of a 5 chair mixed (NHS and private) dental practice in Isleworth, London. Here she practices general dentistry with a keen interest in cosmetic dentistry. She has undertaken several training courses in aesthetic dentistry and has a postgraduate diploma in restorative and aesthetic dentistry. Dr Raabiha thoroughly enjoys teaching dentistry and is often asked to lecture at universities and give webinars on various topics within dentistry. She has successfully launched her own course on The Patient Journey and effective communication and as a result trains and mentors dentists on patient-focused care. Dr Raabiha is on the editorial board of the prestigious Dentistry Magazine and is a key opinion leader for companies such as Orascoptic, Optident and Acteon. She has a following of over 11,000 people on her Instagram @drraabihamaan which she uses to teach, motivate and inspire the next generation of dentists.'
    },
    {
      name: 'Dr. Nicola Z Gore',
      imageUri: require('../assets/images/drNicola.png'),
      description: 'BDS MClinDent (Fixed & Removable Prosthodontics) MJDF RCS PG Cert (Dental Education) PG Dip Orthodontics Fellowship (College Of General Dentist) FCGDent Dr Gore qualified in 1993 from Guy’s and St Thomas’s Hospital (U.LOND).',
      longDescription: 'BDS MClinDent (Fixed & Removable Prosthodontics) MJDF RCS PG Cert (Dental Education) PG Dip Orthodontics Fellowship (College Of General Dentist) FCGDent Dr Gore qualified in 1993 from Guy’s and St Thomas’s Hospital (U.LOND). Since qualifying, she has held various General Practice and Hospital maxillofacial posts within the UK and Australia. Over a two year full time programme, she gained a Masters degree in Clinical Dentistry (Fixed and Removable Prosthodontics) from The Royal London Hospital(U.LOND). In 2003, she opened her first mixed NHS/ Private squat practice and in 2009, a second private practice from Squat also. She soon realised her passion for teaching and became heavily involved in teaching and took up her role as a Dental Foundation trainer and since then has trained 25 Foundation Trainees as part of Health Education England. Her passion for dentistry keeps her up to date with the latest advancements within the profession. Dr Gore regularly attends dental conferences and courses and has completed a postgraduate diploma in orthodontics , The Restorative one year Chris Orr’ programme and the one year ‘Megagen Implant’ Course. She is an experienced ‘Elite Invisalign provider’ since 2017. In June 2023 she was honoured to have gained her Fellowship from the prestigious College Of General Dentistry (FCGDent) Dr Gore is on the Committee of The British Academy Of Cosmetic Dentistry (BACD) as well as being the President and Co-founder of The British Iranian Dental Association (BIDA). Being an experienced Educational Supervisor and dental educator has given her the tools to be able to engage with the dental students and younger dentists. Dr Gore and Dr Mann have visited many UK dental universities and given talks and webinars on various topics in dentistry as well as sponsored many dental undergraduates and postgraduate events through Dentistry In a Nutshell. The Birth of her recently co-authored book ‘Dentistry In A Nutshell’ has been the result of 30 years of clinical dentistry & teaching. She has been fortunate to have met and collaborated with Dr Raabiha Maan to develop such a great clinical textbook. Dr Gore has a YouTube Channel (Dr Nicola Z Gore) and also on Instagram (@Dentalcosmeticss).'
    },
  ]);

  const openAppleTermsOfUse = () => {
    const url = 'https://www.dentistryinanutshell.com/dian/public/terms-and-conditions'; // Standard Apple Terms of Use link
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };
  
  const Header = () => {
    return (
      <Pressable style={styles.headerContainer}>
        <Text style={styles.title}>Introducing</Text>
        <Text style={styles.subtitle}>Your Personalised Platform for Dentists</Text>
        <ScrollView>
          <Text style={styles.description}>
            Step into DIAN Club, the platform crafted exclusively with your needs in mind. We've woven your aspirations and desires into every aspect.
          </Text>
          <Text style={styles.description}>
            Unveil a world of tailored resources—immersive videos, captivating podcasts, and insightful blogs—that resonate with your journey in dentistry. Our AI-driven tools are finely tuned to your workflow, easing patient interactions and note-taking.
          </Text>
          <Text style={styles.description}>
            The courses and webinars? They're shaped by your thirst for knowledge and growth, whether you're a seasoned expert or an aspiring student. And because we care about your well-being, find a dedicated space offering valuable insights to balance your career and life.
          </Text>
          <Text style={styles.description}>
            For practice owners like you, our support spans beyond dentistry. Count on us for informed decisions, enriched by financial insights and business tools. Your voice echoes in our interactive forum—a community that listens, shares, and uplifts.
          </Text>
          <Text style={styles.description}>
            This is your moment—DIAN Club is your masterpiece, reflecting your journey, desires, and dreams. Elevate your dental career, exclusively with DIAN Club.
          </Text>
          <Text style={styles.descriptionEnd}>
            Join the club and become a part of our community!
          </Text>
          <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => Linking.openURL('https://dian.club/')}>
              <Text style={styles.joinButtonText}>Join Us Now</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openAppleTermsOfUse}
              style={styles.joinButton}
            >
              <Text style={styles.joinButtonText}> Terms of Use</Text>
            </TouchableOpacity>
          </View>
          <Image source={require('../assets/images/Rectangle37.png')}
           style={{
            width: '100%',
            height: 333,
            // borderRadius:11,
            resizeMode:'contain',
            // backgroundColor:'red'
           }} 
           />
        </ScrollView>
      </Pressable>
    )
  }

  return (
    <PageLayout
      containerStyles={styles.container}
      flatList={{
        data: teamMembers,
        keyExtractor: (item, index) => `${item.name}_${index}`,
        numColumns: 1,
        renderItem: ({ item, index }) => {
          if (index == 0) {
            return (
              <Header />
            )
          } else {
            return (
              <TeamMember
                name={item.name}
                description={item.description}
                imageUri={item.imageUri}
                longDescription={item.longDescription}
              />
            )
          }
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

export default AboutScreen;

