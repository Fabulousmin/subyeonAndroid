import SendBird from 'sendbird';
import {
    Platform,
    AsyncStorage
} from 'react-native';
import FCM, {NotificationActionType} from "react-native-fcm";

// const APP_ID = '078105E7-BD8C-43C9-A583-59E334353965'; // test
const APP_ID = 'E1FE5079-64A1-4E76-885C-7547A282C963'; // sample

export const sbRegisterPushToken = (token) => {
    return new Promise((resolve, reject) => {
        const sb = SendBird.getInstance();
        if(sb) {
            if(Platform.OS === 'ios') {
                sb.registerAPNSPushTokenForCurrentUser(token, (result, error) => {
                    if(!error) {
                        resolve();
                    }
                    else reject(error);
                });
            } else {
                sb.registerGCMPushTokenForCurrentUser(token, (result, error) => {
                    if(!error) {
                        resolve();
                    }
                    else reject(error);
                });
            }
        } else {
            reject('SendBird is not initialized');
        }
    });
};
export const sbUnregisterPushToken = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('pushToken', (err, token) => {
            if(token) {
                const sb = SendBird.getInstance();
                if(sb) {
                    if(Platform.OS === 'ios') {
                        sb.unregisterAPNSPushTokenForCurrentUser(token, (result, error) => {
                            if(!error) {
                                resolve();
                            }
                            else reject(error);
                        });
                    } else {
                        sb.unregisterGCMPushTokenForCurrentUser(token, (result, error) => {
                            if(!error) {
                                resolve();
                            }
                            else reject(error);
                        });
                    }
                } else {
                    reject('SendBird is not initialized');
                }
            } else {
                resolve();
            }
        });
    });
};

export const sbConnect = (userId, nickname,profileUrl) => {
    return new Promise((resolve, reject) => {
      console.log('유저아이디',userId)
        if (!userId) {
            reject('UserID is required.');
            return;
        }
        const sb = new SendBird({'appId': APP_ID});
        sb.connect(userId, (user, error) => {
            if (error) {
              console.log('에러 뜻다',error)
                reject('SendBird Login Failed.');
            } else {
                if(Platform.OS === 'ios') {
                    FCM.getAPNSToken().then(token => {
                        if(token) {
                            sb.registerAPNSPushTokenForCurrentUser(token, function(result, error){
                                console.log("registerAPNSPushTokenForCurrentUser");
                                console.log(result);
                            });
                        }
                    });
                } else {
                    FCM.getFCMToken().then(token => {
                        if(token) {
                            sb.registerGCMPushTokenForCurrentUser(token, function(result, error){
                                console.log("registerAPNSPushTokenForCurrentUser");
                                console.log(result);
                            });
                        }
                    });
                }
                resolve(sbUpdateProfile(nickname,profileUrl));
            }
        })
    })
};

export const sbUpdateProfile = (nickname,profileUrl) => {
    return new Promise((resolve, reject) => {
        let sb = SendBird.getInstance();
        if(!sb) sb = new SendBird({'appId': APP_ID});
        sb.updateCurrentUserInfo(nickname,profileUrl,(user, error) => {
            if (error) {
                reject('Update profile failed.')
            } else {
                AsyncStorage.setItem('user', JSON.stringify(user), () => {
                    resolve(user);
                });
            }
        })
    })
}

export const sbDisconnect = () => {
    return new Promise((resolve, reject) => {
        const sb = SendBird.getInstance();
        if (sb) {
            AsyncStorage.removeItem('user', () => {
                sb.disconnect(() => {
                    resolve(null);
                });
            });
        } else {
            resolve(null);
        }
    })
}

export const sbGetCurrentInfo = () => {
    const sb = SendBird.getInstance();
    if(sb.currentUser) {
        return {
            profileUrl: sb.currentUser.profileUrl,
            nickname: sb.currentUser.nickname
        }
    }
    return {};
}

export const sbUserBlock = (blockUserId) => {
    return new Promise((resolve, reject) => {
        const sb = SendBird.getInstance();
        sb.blockUserWithUserId(blockUserId, (user, error) => {
            if (error) {
                reject(error);
            } else {
                resolve(user);
            }
        })
    });
}

export const sbUserUnblock = (unblockUserId) => {
    return new Promise((resolve, reject) => {
        const sb = SendBird.getInstance();
        sb.unblockUserWithUserId(unblockUserId, (user, error) => {
            if (error) {
                reject(error);
            } else {
                resolve(user);
            }
        })
    });
}

export const sbCreateBlockedUserListQuery = () => {
    const sb = SendBird.getInstance();
    return sb.createBlockedUserListQuery();
}

export const sbGetBlockUserList = (blockedUserListQuery) => {
    return new Promise((resolve, reject) => {
        blockedUserListQuery.next((blockedUsers, error) => {
            if (error) {
                reject(error);
            } else {
                resolve(blockedUsers);
            }
        });
    });
}
