

import React from 'react';
import { ISvgProps } from '@global';
import { IconNames } from './app-icon.data';
import { ColorValue, Text, View, ViewStyle } from 'react-native';
import Menu from '../../screens/svg-icons/menu';
import Notification from '../../screens/svg-icons/notification';
import Profile from '../../screens/svg-icons/profile';
import MaskGroup from '../../screens/svg-icons/mask-group';
import RightIcon from '../../screens/svg-icons/right-icon';
import Search from '../../screens/svg-icons/search';
import Mail from '../../screens/svg-icons/mail';
import Web from '../../screens/svg-icons/web';
import Instagram from '../../screens/svg-icons/instagram';
import ProfileGuidline from '../../screens/svg-icons/profileGuidline';
import ActiveBox from '../../screens/svg-icons/active-item';
import ManageUser from '../../screens/svg-icons/manageUser';
import Video from '../../screens/svg-icons/video';
import PodsCastWebinars from '../../screens/svg-icons/PodcastWebinars';
import Blogs from '../../screens/svg-icons/blogs';
import Student from '../../screens/svg-icons/student';
import PubMed from '../../screens/svg-icons/pubmed';
import Download from '../../screens/svg-icons/download';
import WellBeing from '../../screens/svg-icons/wellbeing';
import Courses from '../../screens/svg-icons/courses';
import Guidelines from '../../screens/svg-icons/guideline';
import Refer from '../../screens/svg-icons/refer';
import Forum from '../../screens/svg-icons/forum';
import WorkFlows from '../../screens/svg-icons/workFlows';
import Assist from '../../screens/svg-icons/assist';
import About from '../../screens/svg-icons/about';
import Faqs from '../../screens/svg-icons/faqs';
import Contact from '../../screens/svg-icons/contact';
import Pricing from '../../screens/svg-icons/pricing';
import Shop from '../../screens/svg-icons/shop';
import GoogleLogin from '../../screens/svg-icons/google-login';
import AppleLogin from '../../screens/svg-icons/apple-login';
import MicroPhone from '../../screens/svg-icons/microphone';
import DianClub from '../../screens/svg-icons/dian-club';
import General from '../../screens/svg-icons/general';
import DeleteAccount from '../../screens/svg-icons/delete-act';
import Billing from '../../screens/svg-icons/billig';
import EmailNotification from '../../screens/svg-icons/email-notification';
import Certificate from '../../screens/svg-icons/certificate';
import EditProfile from '../../screens/svg-icons/edit-profile';
import UserProfile from '../../screens/svg-icons/user-profile';
import DeleteImg from '../../screens/svg-icons/delete-img';
import DainLogo from '../../screens/svg-icons/dian-logo';
import DianStamp from '../../screens/svg-icons/dian-stamp';
import SignatureLeft from '../../screens/svg-icons/signatureLeft';
import SignatureRight from '../../screens/svg-icons/signatureRight';
import BillingEllipse from '../../screens/svg-icons/billingEllipse';
import ComprehensiveExam from '../../screens/svg-icons/comprehensive-exam';
import RoutinExam from '../../screens/svg-icons/routine-exam';
import FilingComposite from '../../screens/svg-icons/filling-composite';
import ChildExam from '../../screens/svg-icons/child-exam';
import TreatmentOption from '../../screens/svg-icons/treatment-option';
import FillingComposite2 from '../../screens/svg-icons/filling-composite2';
import EmergencyAppointment from '../../screens/svg-icons/emergency-appointment';
import RCT1 from '../../screens/svg-icons/rct1';
import DrySocket from '../../screens/svg-icons/dry-socket';
import CrownPreparation from '../../screens/svg-icons/crown-preparation';
import RCT2 from '../../screens/svg-icons/rct2';
import MicrophoneOff from '../../screens/svg-icons/mircophoneOff';
import MicrophoneOn from '../../screens/svg-icons/microphoneOn';
import VideoPlay from '../../screens/svg-icons/video-play.';
import ExplainerVideo from '../../screens/svg-icons/explainerVideo.';
import SpeechToText from '../../screens/svg-icons/speechText';
import EmailSender from '../../screens/svg-icons/emailSender';
import Templates from '../../screens/svg-icons/templates'; 
import ArrowLeft from '../../screens/svg-icons/arrowLeft';


interface IProps extends ISvgProps {
  icon: IconNames;
  containerStyle?: ViewStyle;
  color?: ColorValue;
  size?: Number;
}

const AppIcon: React.FC<IProps> = ({ icon, containerStyle, ...props }) => (
  <View style={containerStyle}>
    {icon === IconNames.MENU && <Menu {...props} />}
    {icon === IconNames.SEARCH && <Search {...props} />}
    {icon === IconNames.NOTIFICATION && <Notification {...props} />}
    {icon === IconNames.PROFILE && <Profile {...props} />}
    {icon === IconNames.MASKGROUP && <MaskGroup {...props} />}
    {icon === IconNames.RIGHT_ICON && <RightIcon {...props} />}
    {icon === IconNames.MAIL && <Mail {...props} />}
    {icon === IconNames.WEB && <Web {...props} />}
    {icon === IconNames.INSTAGRAM && <Instagram {...props} />}
    {icon === IconNames.PROFLIEGUIDE && <ProfileGuidline {...props} />}
    {icon === IconNames.ACTIVEBOX && <ActiveBox {...props} />}
    {icon === IconNames.MANAGEUSER && <ManageUser {...props} />}
    {icon === IconNames.VIDEO && <Video {...props} />}
    {icon === IconNames.PODCASTWEBINARS && <PodsCastWebinars {...props} />}
    {icon === IconNames.BLOGS && <Blogs {...props} />}
    {icon === IconNames.STUDENT && <Student {...props} />}
    {icon === IconNames.PUBMED && <PubMed {...props} />}
    {icon === IconNames.DOWNLOAD && <Download {...props} />}
    {icon === IconNames.WELLBEING && <WellBeing {...props} />}
    {icon === IconNames.COURSES && <Courses {...props} />}
    {icon === IconNames.GUIDELINES && <Guidelines {...props} />}
    {icon === IconNames.REFER && <Refer {...props} />}
    {icon === IconNames.FORUM && <Forum {...props} />}
    {icon === IconNames.WORKFLOW && <WorkFlows {...props} />}
    {icon === IconNames.ASSIST && <Assist {...props} />}
    {icon === IconNames.ABOUT && <About {...props} />}
    {icon === IconNames.FAQS && <Faqs {...props} />}
    {icon === IconNames.CONTACT && <Contact {...props} />}
    {icon === IconNames.PRICING && <Pricing {...props} />}
    {icon === IconNames.SHOP && <Shop {...props} />}
    {icon === IconNames.GOOGLE_LOGIN && <GoogleLogin {...props} />}
    {icon === IconNames.APPLE_LOGIN && <AppleLogin {...props} />}
    {icon === IconNames.MIRCOPHONE && <MicroPhone {...props} />}
    {icon === IconNames.DIAN_CLUB && <DianClub {...props} />}
    {icon === IconNames.GENERAL && <General {...props} />}
    {icon === IconNames.DELETE_ACCOUNT && <DeleteAccount {...props} />}
    {icon === IconNames.BILLING && <Billing {...props} />}
    {icon === IconNames.EMAIL_NOTIFICATION && <EmailNotification {...props} />}
    {icon === IconNames.CPD_CERTIFICATE && <Certificate {...props} />}
    {icon === IconNames.EDIT_PROFILE && <EditProfile {...props} />}
    {icon === IconNames.USER_PROFILES && <UserProfile {...props} />}
    {icon === IconNames.DELETE_IMG && <DeleteImg {...props} />}
    {icon === IconNames.DIAN_LOGO && <DainLogo {...props} />}
    {icon === IconNames.DIAN_STAMP && <DianStamp {...props} />}
    {icon === IconNames.SIGNATURE_LEFT && <SignatureLeft {...props} />}
    {icon === IconNames.SIGNATURE_RIGHT && <SignatureRight {...props} />}
    {icon === IconNames.BILLING_ELLIPSE && <BillingEllipse {...props} />}

    {icon === IconNames.COMPREHENSIVE_EXAM && <ComprehensiveExam {...props} />}
    {icon === IconNames.ROUTINE_EXAM && <RoutinExam {...props} />}
    {icon === IconNames.FILLING_COMPOSITE && <FilingComposite {...props} />}
    {icon === IconNames.CHILD_EXAM && <ChildExam {...props} />}
    {icon === IconNames.TREATMENT_OPTIONS && <TreatmentOption {...props} />}
    {icon === IconNames.FILLING_COMPOSITE2 && <FillingComposite2 {...props} />}
    {icon === IconNames.EMERGENCY_APPOINTMENT && <EmergencyAppointment {...props} />}
    {icon === IconNames.RCT_1 && <RCT1 {...props} />}
    {icon === IconNames.DRY_SOCKET && <DrySocket {...props} />}
    {icon === IconNames.CROWN_PREPARATION && <CrownPreparation {...props} />}
    {icon === IconNames.PERICOROITIS && <CrownPreparation {...props} />}
    {icon === IconNames.CROWN_BRIDGE_FIT && <CrownPreparation {...props} />}
    {icon === IconNames.RCT_2 && <RCT2 {...props} />}

    {icon === IconNames.MIRCOPHONE_OFF && <MicrophoneOff {...props} />}
    {icon === IconNames.MIRCOPHONE_ON && <MicrophoneOn {...props} />}
    
    {icon === IconNames.VIDEO_PLAY && <VideoPlay {...props} />}
    
    {icon === IconNames.EXPLAINER_VIDEO && <ExplainerVideo {...props} />}
    {icon === IconNames.SPEECH_TO_TEXT && <SpeechToText {...props} />}
    {icon === IconNames.EMAIL_SENDER && <EmailSender {...props} />}
    {icon === IconNames.TEMPLATE && <Templates {...props} />}
    {icon === IconNames.ARROWLEFT && <ArrowLeft {...props} />}
  </View>
);

export default AppIcon;