import { Alert } from 'react-native';

import serverIP from '../constants/serverIP';

async function request<A>(
  requestInfo: RequestInfo | string,
  requestInit?: RequestInit,
): Promise<A> {
  if (typeof requestInfo === 'string') requestInfo = serverIP + requestInfo;
  else requestInfo = { ...requestInfo, url: serverIP + requestInfo.url };

  const { result, resultData, errorMessage } = await (
    await fetch(requestInfo, {
      ...requestInit,
      headers: {
        ...requestInit?.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  ).json();

  if (result === 0) {
    Alert.alert(
      'Error',
      errorMessage,
      [
        {
          text: 'Confirm',
        },
      ],
      { cancelable: false },
    );
    throw new Error(errorMessage);
  } else return resultData;
}

export default request;
