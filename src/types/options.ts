import { Dispatcher, request } from 'undici';

import type { OAuth2 } from '@/core/OAuth2';

import type { YTDL_ClientTypes } from '@/meta/Clients';

import { YTDL_Agent } from './Agent';
import { YTDL_VideoFormat } from './Ytdl';
import { YTDL_Hreflang } from './Language';

export type YTDL_Filter = 'audioandvideo' | 'videoandaudio' | 'video' | 'videoonly' | 'audio' | 'audioonly' | ((format: YTDL_VideoFormat) => boolean);

export type YTDL_ChooseFormatOptions = {
    quality?: 'lowest' | 'highest' | 'highestaudio' | 'lowestaudio' | 'highestvideo' | 'lowestvideo' | (string & {}) | number | string[] | number[];
    filter?: YTDL_Filter;

    /** You can specify which clients to exclude from format selection. (This option takes precedence over includingClients.)
     * @default ['web']
     */
    excludingClients?: Array<YTDL_ClientTypes>;

    /** You can specify which clients to include in the format selection.
     * @note Do not specify because the web client will return a 403 error.
     */
    includingClients?: Array<YTDL_ClientTypes> | 'all';

    format?: YTDL_VideoFormat;
};

export interface YTDL_OAuth2ClientData {
    clientId: string;
    clientSecret: string;
}

export type YTDL_OAuth2Credentials = {
    accessToken: string;
    refreshToken: string;
    expiryDate: string;
    clientData?: YTDL_OAuth2ClientData;

    expiresIn?: number;
    scope?: string;
    tokenType?: string;
};

export type YTDL_GetInfoOptions = {
    /** You can specify the language to be set when making a request to the API. */
    lang?: YTDL_Hreflang;

    /** You can specify the request options. */
    requestOptions?: Parameters<typeof request>[1];

    /** API requests can be rewritten. (This is also a great way to debug what requests are being sent). */
    rewriteRequest?: (url: string, options: Parameters<typeof request>[1]) => { url: string; options: Parameters<typeof request>[1] };

    /** You can specify an agent generated by the createAgent function, etc. */
    agent?: YTDL_Agent;

    /** You can specify a valid PoToken to avoid bot errors. */
    poToken?: string;

    /** You can specify a valid VisitorData to avoid bot errors, etc. */
    visitorData?: string;

    /** You can specify whether to include Player API responses.
     * @default false
     */
    includesPlayerAPIResponse?: boolean;

    /** You can specify whether to include Next API responses.
     * @default false
     */
    includesNextAPIResponse?: boolean;

    /** You can specify whether to include the original streaming adaptive data in the formatted data.
     * @default false
     */
    includesOriginalFormatData?: boolean;

    /** You can specify whether to include related videos.
     * @default true
     */
    includesRelatedVideo?: boolean;

    /** You can specify the client from which you want to retrieve video information.
     * @note To stabilize functionality, web, webCreator, tvEmbedded, IOS, and android are always included. To disable it, specify `disableDefaultClients`. (If clients is not specified, it will be included.)
     * @default ["web", "webCreator", "tvEmbedded", "ios", "android"]
     */
    clients?: Array<YTDL_ClientTypes>;

    /** You can disable the default client. (If clients is not specified, it will be included.) */
    disableDefaultClients?: boolean;

    /** You can specify OAuth2 tokens to avoid age restrictions and bot errors.
     * @default null
     */
    oauth2?: OAuth2;
};

export interface YTDL_DownloadOptions extends YTDL_GetInfoOptions, YTDL_ChooseFormatOptions {
    range?: {
        start?: number;
        end?: number;
    };
    begin?: string | number;
    liveBuffer?: number;
    highWaterMark?: number;
    IPv6Block?: string;
    dlChunkSize?: number;
}

export type YTDL_RequestOptions = { rewriteRequest?: YTDL_GetInfoOptions['rewriteRequest']; requestOptions?: Omit<Dispatcher.RequestOptions, 'origin' | 'path' | 'method'> & Partial<Pick<Dispatcher.RequestOptions, 'method'>> };
