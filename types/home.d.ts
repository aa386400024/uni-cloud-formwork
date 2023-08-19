declare interface AuthSetting {
    'scope.record'?: boolean;
    'scope.camera'?: boolean;
    [key: string]: boolean | undefined;
}

declare interface GetSettingResult {
    authSetting: AuthSetting;
}

declare interface ChildComponentRef {
  netWorkStatus: () => void;
  // 可以继续添加子组件上的其他方法或属性类型定义
}