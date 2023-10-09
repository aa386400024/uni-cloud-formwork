declare interface Stat {
    id: number;
    number: number;
    description: string;
}

declare interface Grid {
	name: string;
	title: string;
}

declare interface interviews {
    session_id: string;
	interview_started_at: string;
	interview_ended_at: string;
	interview_level?: string;
	interview_style?: string;
	position_name: string;
	label: string;
	video: string;
	text: string;
}
