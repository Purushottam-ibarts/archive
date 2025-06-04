import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PageLayout from '../layouts/page-layout/page-layout';

const FaqScreen = () => {
  const [faqs, setFaqs] = useState([
    {
      question: 'What are the different subscription plans available?',
      answer: 'We offer three subscription plans: Started, Student and Premium. Each plan varies in features and pricing to suit your needs.',
      isOpen: false,
    },
    {
      question: 'How do I upgrade or downgrade my subscription?',
      answer: 'You can easily upgrade or downgrade your subscription through your account settings. Select the desired plan and follow the instructions provided.',
      isOpen: false,
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards and PayPal for subscription payments.',
      isOpen: false,
    },
    {
      question: 'Is there a free trial period?',
      answer: 'Yes, we offer a Starter subscription which gives you access to our blogs, to some downloadable material, access to two free videos and the ability to view discussions within our Forum.',
      isOpen: false,
    },
    {
      question: 'Can I cancel my subscription at any time?',
      answer: 'Yes, you can cancel your subscription at any time. Your subscription will remain active until the end of the billing cycle.',
      isOpen: false,
    },
    {
      question: 'Do you offer refunds?',
      answer: 'No, however you can cancel your subscription at any time. Your subscription will remain active until the end of the billing cycle.',
      isOpen: false,
    },
    {
      question: 'How can I update my billing information?',
      answer: 'You can update your billing information by logging into your account and navigating to the billing settings section.',
      isOpen: false,
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely! We take data security seriously and employ industry-standard encryption and security measures to protect your information. Please view our privacy policy page for more information.',
      isOpen: false,
    },
    {
      question: 'Can I use my subscription on multiple devices?',
      answer: 'You can access your subscription on multiple devices by logging in with your Google credentials.',
      isOpen: false,
    },
    {
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on the "Forgot Password" link on the login page. You will receive an email with instructions on how to create a new password.',
      isOpen: false,
    },
    {
      question: 'What happens if I miss a payment?',
      answer: 'If a payment is missed, we will send you a notification to update your payment information. Your access to the subscription service may be temporarily suspended until the issue is resolved.',
      isOpen: false,
    }, 
    {
      question: 'Starter $0',
      answer: 'Videos (2 free videos),Podcasts only, Blogs.Forum(View only)',
      isOpen: false,
    }, 
    {
      question: 'Student $6.99',
      answer: 'Podcasts only, Blogs.Forum(View only),student,workflow,forum',
      isOpen: false,
    }, 
    {
      question: 'Premium $15.99',
      answer: 'Podcasts and webinars,Assist,Blogs,Student,workflow,forum,Course,Guidelines,Workflow',
      isOpen: false,
    }, 
    {
      question: 'Dentistry Owner $50',
      answer: 'Podcasts and webinars,Assist,Blogs,Student,workflow,forum,Course,Guidelines,Workflow,Video,Download,Abilities',
      isOpen: false,
    }, 
    {
      question: 'Start Yearly $0',
      answer: 'Vedio,Podcasts,Blog,Forum',
      isOpen: false,
    }, 
    {
      question: 'Student Yearly $65',
      answer: 'Vedio,Podcasts,Blog,Forum,student,workflow',
      isOpen: false,
    }, 
    {
      question: 'Premium Yearly $165',
      answer: 'Vedio,Podcasts,Blog,Forum,student,workflow,Assist,Download,Courses,Guideline',
      isOpen: false,
    }, 
    {
      question: 'Dentistry Owner Yearly $525',
      answer: 'Vedio,Podcasts,Blog,Forum,student,workflow,Assist,Download,Courses,Guideline',
      isOpen: false,
    }, 
  ]);

  const toggleFaq = (index) => {
    setFaqs(prevFaqs => {
      const newFaqs = [...prevFaqs];
      newFaqs[index].isOpen = !newFaqs[index].isOpen;
      return newFaqs;
    });
  };

  return (
    <PageLayout
      containerStyles={styles.container}
      flatList={{
        data: faqs,
        listHeaderComponent: (
          <React.Fragment key={'list-header-components-fragment'}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Frequently Asked Questions</Text>
            </View>
          </React.Fragment>
        ),
        keyExtractor: (item, index) => `${item.question}_${index}`,
        numColumns: 1,
        renderItem: ({ item, index }) => (
          <Pressable>
            <TouchableOpacity key={index} style={styles.faq} onPress={() => toggleFaq(index)}>
              <View style={styles.questionContainer}>
                <Text style={styles.question}>{item.question}</Text>
                <Icon
                  name={item.isOpen ? 'remove' : 'add'}
                  size={24}
                  color='white'
                />
              </View>
              {item.isOpen && <Text style={styles.answer}>{item.answer}</Text>}
            </TouchableOpacity>
          </Pressable>
        ),
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom:33,
  },
  headerContainer: {
    marginTop: 11,
    marginRight: 2,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    // fontWeight: 'bold',
    marginBottom: 20,
    margin: '3%',
    color: '#D9AA59',
  },
  faq: {
    marginBottom: 10,
    marginHorizontal: '3%',
    paddingBottom: 10,  
    borderBottomWidth: 1, 
    borderBottomColor: '#999',  
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  question: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: 'white',
    width: '95%',
  },
  answer: {
    fontSize: 16,
    color: '#B7B7B7',
    marginTop: 5,
  },
  backgroundimg: {
    flex: 1,
    height: '100%',
  },
});

export default FaqScreen;
