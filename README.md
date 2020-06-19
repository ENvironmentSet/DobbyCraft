### 필수!

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