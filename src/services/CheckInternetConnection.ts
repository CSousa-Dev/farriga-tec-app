import NetInfo from '@react-native-community/netinfo';

export default async function CheckInternetConnection(){
    const state = await NetInfo.fetch();
    return state.isConnected;
}