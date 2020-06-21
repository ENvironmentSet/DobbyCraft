### 필수!

```
npm run clean-cache
```
를 실행하세요

node_modules를 재설치하세요.

```
cd ios
pod install
```
을 해주세요.


node_modules/react-native-permissions/ios/RNPermissions.m 파일의 

```swift
if ([available count] == 0) {
    NSMutableString *message = [NSMutableString new];

    [message appendString:@"⚠  No permission handler detected.\n\n"];
    [message appendString:@"• Check that you link at least one permission handler in your Podfile.\n"];
    [message appendString:@"• Uninstall this app, delete your Xcode DerivedData folder and rebuild it.\n"];
    [message appendString:@"• If you use `use_frameworks!`, follow the workaround guide in the project README."];

    RCTLogError(@"%@", message);
  }
```

제일 하단을 주석처리 해주세요! 이렇게

```swift
if ([available count] == 0) {
    NSMutableString *message = [NSMutableString new];

    [message appendString:@"⚠  No permission handler detected.\n\n"];
    [message appendString:@"• Check that you link at least one permission handler in your Podfile.\n"];
    [message appendString:@"• Uninstall this app, delete your Xcode DerivedData folder and rebuild it.\n"];
    [message appendString:@"• If you use `use_frameworks!`, follow the workaround guide in the project README."];

    // RCTLogError(@"%@", message);
  }
```

react-native-image-silder-box의 

SilderBox.style.js 파일의 내용을

``js
export default {
  paginationBoxStyle: {
    position: "absolute",
    bottom: -30,
    padding: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "#BDBDBD"
  }
};
``` 

다음으로 수정해주세요

SilderBox.js도 마찬가지입니다.

``js
const colors = {
  dotColors: "#000",
  white: "#BDBDBD"
};
```
