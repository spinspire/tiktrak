/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Attachments = "attachments",
	Auditlog = "auditlog",
	Comments = "comments",
	Hooks = "hooks",
	Projects = "projects",
	Tickets = "tickets",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AttachmentsRecord = {
	ticket: RecordIdString
	user: RecordIdString
	file: string
	label: string
}

export type AuditlogRecord<Tdata = unknown, Toriginal = unknown> = {
	collection: string
	record: string
	event: string
	user?: RecordIdString
	admin?: string
	data?: null | Tdata
	original?: null | Toriginal
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
	"email" = "email",
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
	users?: RecordIdString[]
}

export type TicketsRecord = {
	title: string
	description?: string
	type: string
	priority: string
	status?: string
	substatus?: string
	project: RecordIdString
	creator: RecordIdString
	assignee?: RecordIdString
	estimate?: number
	budget?: number
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AttachmentsResponse<Texpand = unknown> = Required<AttachmentsRecord> & BaseSystemFields<Texpand>
export type AuditlogResponse<Tdata = unknown, Toriginal = unknown, Texpand = unknown> = Required<AuditlogRecord<Tdata, Toriginal>> & BaseSystemFields<Texpand>
export type CommentsResponse<Texpand = unknown> = Required<CommentsRecord> & BaseSystemFields<Texpand>
export type HooksResponse<Texpand = unknown> = Required<HooksRecord> & BaseSystemFields<Texpand>
export type ProjectsResponse<Tconfig = unknown, Texpand = unknown> = Required<ProjectsRecord<Tconfig>> & BaseSystemFields<Texpand>
export type TicketsResponse<Texpand = unknown> = Required<TicketsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	attachments: AttachmentsRecord
	auditlog: AuditlogRecord
	comments: CommentsRecord
	hooks: HooksRecord
	projects: ProjectsRecord
	tickets: TicketsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	attachments: AttachmentsResponse
	auditlog: AuditlogResponse
	comments: CommentsResponse
	hooks: HooksResponse
	projects: ProjectsResponse
	tickets: TicketsResponse
	users: UsersResponse
}