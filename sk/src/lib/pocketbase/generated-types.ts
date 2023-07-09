/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Attachments = "attachments",
	Comments = "comments",
	Hooks = "hooks",
	Projects = "projects",
	Tickets = "tickets",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string

// System fields
export type BaseSystemFields = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: { [key: string]: any }
}

export type AuthSystemFields = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields

// Record types for each collection

export type AttachmentsRecord = {
	ticket: RecordIdString
	user: RecordIdString
	file: string
	label: string
}

export type CommentsRecord = {
	ticket: RecordIdString
	user: RecordIdString
	body: string
}

export enum HooksEventOptions {
	"insert" = "insert",
	"update" = "update",
	"delete" = "delete",
}

export enum HooksActionTypeOptions {
	"command" = "command",
	"post" = "post",
}
export type HooksRecord = {
	collection: string
	event: HooksEventOptions
	action_type: HooksActionTypeOptions
	action: string
	action_params?: string
	expands?: string
	disabled?: boolean
}

export type ProjectsRecord<Tconfig = unknown> = {
	title: string
	logo?: string
	config: null | Tconfig
	description?: string
	users?: RecordIdString
}

export type TicketsRecord = {
	title: string
	description?: string
	type: string
	status?: string
	substatus?: string
	project?: RecordIdString
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AttachmentsResponse = AttachmentsRecord & BaseSystemFields
export type CommentsResponse = CommentsRecord & BaseSystemFields
export type HooksResponse = HooksRecord & BaseSystemFields
export type ProjectsResponse<Tconfig = unknown> = ProjectsRecord<Tconfig> & BaseSystemFields
export type TicketsResponse = TicketsRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	attachments: AttachmentsRecord
	comments: CommentsRecord
	hooks: HooksRecord
	projects: ProjectsRecord
	tickets: TicketsRecord
	users: UsersRecord
}