declare interface FetchIvQuestion {
	selectedStyleRadio: string,
	selectedLevelRadio: string,
	selectedSkillRadios: string[]
}

declare interface UserAnswer {
    question_id: string;
	question_text: string;
	skills: string[];
    answer: string;
    recording_url: string;
    video_url: string;
	commonUUID: string;
}

declare interface Questions {
    question_id: string;
	question_text: string;
	skills: string[];
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
  sessionId: string;
  startedAt: string;
  endedAt: string;
}

declare interface Interviews {
    session_id: string;
	interview_started_at: string;
	interview_ended_at: string;
	interview_level?: string;
	interview_style?: string;
	isCompleted?: string;
	position_name: string;
	label: string;
	video: string;
	text: string;
}

declare interface IvHsitory {
    pageNo: number;
	pageSize: number;
}