/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { CreateNodeDto, FileEntity, TreeEntity } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class File<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags File
   * @name FileControllerFindAll
   * @summary 获取文件列表
   * @request GET:/file/children/{id}
   */
  fileControllerFindAll = (id: number, params: RequestParams = {}) =>
    this.http.request<TreeEntity[], any>({
      path: `/file/children/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags File
   * @name FileControllerFindOne
   * @request GET:/file/{id}
   */
  fileControllerFindOne = (id: number, params: RequestParams = {}) =>
    this.http.request<FileEntity, any>({
      path: `/file/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags File
   * @name FileControllerRemove
   * @request DELETE:/file/{id}
   */
  fileControllerRemove = (id: number, params: RequestParams = {}) =>
    this.http.request<boolean, any>({
      path: `/file/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags File
   * @name FileControllerFindAncestors
   * @request GET:/file/ancestors/{id}
   */
  fileControllerFindAncestors = (id: number, params: RequestParams = {}) =>
    this.http.request<FileEntity[], any>({
      path: `/file/ancestors/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags File
   * @name FileControllerCreate
   * @request POST:/file/create
   */
  fileControllerCreate = (data: CreateNodeDto, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/file/create`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
