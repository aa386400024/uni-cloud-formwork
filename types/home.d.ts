declare interface AuthSetting {
	'scope.record'?: boolean
	'scope.camera'?: boolean
	[key: string]: boolean | undefined
}

declare interface GetSettingResult {
	authSetting: AuthSetting
}

declare interface ChildComponentRef {
	netWorkStatus: () => void
	// 可以继续添加子组件上的其他方法或属性类型定义
}

declare interface CustomRadio {
	name: string
	value: string
	checked: boolean
}

declare interface FetchIvQuestion {
	selectedStyleRadio: string,
	selectedLevelRadio: string,
	selectedSkillRadios: string[]
}

declare interface UserAnswer {
    question_id: string;
    answer: string;
    recording_url: string;
    video_url: string;
}

declare interface Questions {
    question_id: string;
	value: string;
	label: string;
	video: string;
	text: string;
}

declare interface CurrentJobInfo {
  name?: string;
  position_id?: string;
}

declare interface InterviewAnswer {
  currentJobInfo: CurrentJobInfo;
  ivCustomParams: FetchIvQuestion;
  answers: UserAnswer[];
}
