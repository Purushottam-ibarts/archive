import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, ImageBackground, Keyboard, Platform, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { deletePost, getPost, postCreation } from '../../store/forums/posts/postAction';
import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx';
import DocumentPicker from 'react-native-document-picker';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dot from 'react-native-vector-icons/Entypo';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { getComments, postComments, postCommentsReply } from '../../store/forums/store-comments/commentAction';
import { RootState } from '../../store/store.tsx';
import LinkButton from '../../components/linkbutton.tsx';
import PageLayout from '../../layouts/page-layout/page-layout.tsx';
import { Pressable } from 'react-native';
import { hp } from '../../utils/constants.tsx';
import BaseLayout from '../../layouts/base-layout/base-layout.tsx';
import { backgroundImg } from '../../data/static-assets.ts';
import AppHeader from '../../components/app-header/app-header.tsx';
import AppIcon from '../../components/app-icon/app-icon.tsx';
import { IconNames } from '../../components/app-icon/app-icon.data.ts';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

const Forum: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.common.loading) as any;
  // console.log('loading: ', loading);
  const post = useAppSelector((state: RootState) => state.postSlice?.posts) as any;
  const comments = useAppSelector((state: RootState) => state.commentSlice.comments) as any;
  // console.log('comments: ', comments);
  const user = useAppSelector((state) => state.userSlice);
  // console.log('user: ', user.user.profilePic);
  const [fileUri, setFileUri] = useState(null);
  const [fileType, setFileType] = useState(null); 
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [replyComment, setReply] = useState(false);
  const [commentData, setCommentData] = useState('');

  useEffect(() => {
    dispatch(getPost());
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    // bottomSheetRef.current?.close();
    if (index === 0 || index === -1) {
      setSelectedPost(null);
      bottomSheetRef.current?.close();
    }
  }, []);

  const openBottomSheet = (post:any) => {
    // console.log('post: ', post.id);
    dispatch(getComments(post?.id));
    setSelectedPost(post);
    bottomSheetRef.current?.expand();

  };

  const closeBottomSheet = () => {
    setSelectedPost(null);
    bottomSheetRef.current?.close();
  };

  const selectFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setFileType(result.type);
      setFileUri(result[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.log('Unknown error: ', err);
        throw err;
      }
    }
  };


  const RenderHeader = () => {
    const [content, setContent] = useState(''); 
    const [imageSource, setImageSource] = useState<any>(null); 

    const handleSearchChange = (val: string) => {
      setContent(val);
    };
    const selectImage = async () => {
      const options = {
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.launchImageLibrary(options, response => {
        setImageSource(response.assets[0]);
      });
    };

    const createPost = async () => {
      // console.log('content: ', content);
      // console.log('imageSource: ', imageSource);
      const data = new FormData();
      data.append('content', content);
      if(imageSource != null){
        data.append('media', {
          name: imageSource.fileName,
          type: imageSource.type,
          uri: imageSource.uri,
        });
      }
      const res = await dispatch(postCreation(data)).unwrap();
      if (res.status) {
        dispatch(getPost());
        setImageSource(null);
        setContent('');
      } else {
        setImageSource(null);
        setContent('');
      }
    };

    return(
      <View>
        {/* <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Search Forum</Text>
          <Text style={styles.subHeaderText}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et</Text>
          <TextInput style={styles.searchInput}
            placeholder="Type your search keyword...." placeholderTextColor="#999"
          />
        </View> */}
  
        <View style={styles.postContainer}>
          <View style={styles.postBox}>
            <Image source={{ uri: user?.user?.profilePic }} style={styles.profileImage} />
            <TextInput
              style={styles.postInput}
              placeholder="What's happening?"
              placeholderTextColor="#999" 
              multiline 
              value={content}
              onChangeText={handleSearchChange} 
            />
          </View>
          <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginTop: hp(4) }}>
            <TouchableOpacity style={styles.postButton} onPress={loading ? ()=>{}:createPost }>
              {loading ? <ActivityIndicator size="large" color="#2a5b88" />
                :
              <Text style={styles.postButtonText}>Post</Text>
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.attachmentButton} onPress={selectImage}>
              <Text style={styles.attachmentText}>📎</Text>
            </TouchableOpacity>
          </View>
  
          {imageSource && (
            <View style={styles.filePreview}>
              <Image source={{ uri: imageSource.uri }} style={styles.selectedImage} />
            </View>
          )}
        </View>
      </View>
    )
  };

  const RenderItem = ({ item }: { item: any }) => {
    // console.log('item: ', item?.postUserProfilePic);
    // console.log('item: ',  `https://www.dentistryinanutshell.com/dian/public/api/${item?.postUserProfilePic}`);
    return (
      <Pressable style={styles.forumCard}>
        <View style={styles.userInfo}>
          <View style={{flexDirection:'row',alignItems: 'center',}}>
          <Image source={{ uri: item.postUserProfilePic }} style={styles.profileImage} />
            <Text style={styles.userName}>{item.postUserName}</Text>
          </View>
          {
            item?.user_id == user?.user.id && 
          <Menu>
            <MenuTrigger>
              <View style={{ paddingRight: 10 }}>
                <Dot name="dots-three-vertical" size={20} color="#CCCCCC" />
                </View>
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption onSelect={async() => { 
                // console.log('item.id: ', item);
               const res = await dispatch(deletePost(item.id)).unwrap();
               if(res.status){
                 dispatch(getPost());
               }
              }} text='Delete ' />
            </MenuOptions>
          </Menu> 
          }
        </View>
        <Text style={styles.postText}>{item.content}</Text>
        {item.media_url !== null ? <Image source={{ uri: item.media_url }} style={styles.postImage} /> : null}
        <View style={styles.commentSection}>
          <Text style={styles.commentText}>
            <TouchableOpacity onPress={() => openBottomSheet(item)}
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Icon name="comment-o" size={20} color="#CCCCCC" />
              <Text style={{ paddingLeft: 5, color: '#fff' }}>{item.totalComments}</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </Pressable>
    )
  };

  const renderComment = ({ item }: { item: any }) => {
    // console.log('item: --->>', item);
    return (
      <View style={styles.commentContainer}>
         <View style={{
             flexDirection: 'row',
             alignItems: 'center',
         }}>
          <Image source={{ uri: `https://www.dentistryinanutshell.com/dian/public/api/${item?.postUserProfilePic}` }} style={styles.profileImage} /> 
          <View>
            <Text style={styles.userName}>{item?.user?.name} {item?.time_elapsed}</Text>
            <Text style={styles.userName}>{item?.user?.designation}</Text>
          </View>
        </View>
        <View style={{ marginLeft:'15%' }}>
        <Text style={styles.commentText}>{item.text}</Text>
          <TouchableOpacity
            onPress={() => {
              // console.log('item: ', item);
              setReply(true)
              setCommentData(item)
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10
            }}
          >
            <Icon name="comment-o" size={20} color="#CCCCCC" />
            <Text style={{ paddingLeft: 5, color: '#fff' }}>Replay</Text>
          </TouchableOpacity>
          {
              item?.replies?.length > 0 ? item?.replies.map((v:any, i:number) => {
                return (
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop:10
                  }}>
                    <AppIcon icon={IconNames.PROFILE} size={15}
                      containerStyle={{
                        paddingHorizontal: 5,
                        backgroundColor: '#CCCCCC',
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 35,
                        width: 35,
                      }} />
                    <View>
                      <Text style={[styles.userName,{paddingLeft:10}]}>{v?.text}</Text> 
                    </View>
                  </View>
                )
              })
            :null
          }
        </View>
      </View>
    )
  };

  const submitComment = async () => {
    if(replyComment == true){  
      const data = new FormData();
      data.append('comment_id', commentData.id);
      data.append('post_id', commentData.post_id);
      data.append('text', commentText);
      const res = await dispatch(postCommentsReply(data)).unwrap();
      console.log('res:>>>> ', res);
      if (res.status) {
        dispatch(getComments(commentData.post_id));
        setCommentText('');
        setReply(false),
        setCommentData('')
      }
    }else{
      // console.log('item: >>>>',selectedPost); 
      const data = new FormData();
      data.append('post_id', selectedPost.id);
      data.append('text', commentText);
      const res = await dispatch(postComments(data)).unwrap();
      console.log('res: ', res);
      if (res.status) {
        dispatch(getComments(selectedPost.id));
        setCommentText('');
      }
    }
  };

  return (
    <>
    { user.privilege < 2 && <LinkButton/> }
    <BaseLayout>   
      <ImageBackground source={backgroundImg} style={{ flex: 1, }}>
        <View><AppHeader/></View> 
        <View style={[styles.container]}>
          <Pressable onPress={() => Keyboard.dismiss()}>
            <FlatList
              bounces={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              removeClippedSubviews={true}
              ListHeaderComponent={
                <React.Fragment>
                  <RenderHeader />
                </React.Fragment>
              }
              data={Object.values(post)}
              numColumns={1}
              renderItem={(item) => <RenderItem item={item?.item} />}
              keyboardShouldPersistTaps="handled"
            />
          </Pressable>
        </View>
        <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={['25%', '50%', '85%']}onChange={handleSheetChanges}>
          <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? hp(20) : 0}
          >
            <BottomSheetView style={styles.contentContainer}>

              {selectedPost && (
                <>
                  <FlatList
                    data={comments}
                    renderItem={renderComment}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.commentsList}
                  />
                  <View style={{ flexDirection: 'row', marginBottom: hp(5), width: '100%', justifyContent: 'space-evenly' }}>
                    <TextInput
                      style={styles.commentInput}
                      placeholder="Write a comment..."
                      placeholderTextColor="#999"
                      value={commentText}
                      onChangeText={setCommentText}
                    />
                    <TouchableOpacity onPress={loading ? ()=>{}:submitComment } style={styles.submitButton}>
                      {
                        loading ? <ActivityIndicator size="large" color="#2a5b88" />
                          :
                          <Text style={styles.submitButtonText}>Submit</Text>
                      }
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </BottomSheetView>
          </KeyboardAvoidingView>
        </BottomSheet>
      </ImageBackground>
    </BaseLayout>
    </>
  );
}

export default Forum;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#102335',
    padding: 15,
    marginBottom: 40
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    marginBottom: 10,
  },
  subHeaderText: {
    color: 'white',
    fontSize: 15,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
  },
  postContainer: {
    backgroundColor: '#1c3a57',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  postBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: hp(3)
  },
  filePreview: {
    marginTop: 10,
  },
  attachmentButton: {
    marginLeft: 10,
  },
  attachmentText: {
    color: '#fff',
    fontSize: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor:'#CCCCCC'
  },
  postInput: {
    // flex: 1,
    fontSize: 16,
    // marginRight: 10,
    width: '100%',
    color: '#fff',
    // backgroundColor:'red',
    padding: 15,
    height: hp(5),
    // paddingBottom:10
  },
  postButton: {
    backgroundColor: '#D9AA59',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  postButtonText: {
    color: 'white',
    fontSize: 16,
  },
  forumCard: {
    backgroundColor: '#1c3a57',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row', 
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom: 10,
    // backgroundColor:'red',
    width:'100%'
  },
  userName: {
    color: 'white',
    fontSize: 16,
  },
  postText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  commentSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentText: {
    color: '#D9AA59',
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1c3a57',
  },
  commentContainer: {
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  commentUser: {
    fontWeight: 'bold',
  },
  commentsList: {
    width: '100%',
  },
  commentInput: {
    width: '70%',
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#D9AA59',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#D9AA59',
    borderRadius: 8,
    left: '33%',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  selectedImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover', 
  },
});

const optionsStyles = {
  optionsContainer: {
  backgroundColor: '#102335', // Example background color for the menu
    padding: 10,
    borderRadius: 8,
    width: 150,
  },
  optionsWrapper: {
    padding: 5,
  },
  optionWrapper: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Border color for the options
  },
  optionText: {
    color: '#ffffff', // Text color for options
    fontSize: 16,
  },
};
