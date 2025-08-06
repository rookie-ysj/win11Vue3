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

export interface TreeEntity {
  /** 文件类型: FILE | DIRECTORY */
  type: "FILE" | "DIRECTORY";
  /** 子节点 */
  children: TreeEntity[];
  id: number;
  name: string;
  parent_id: number;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
}

export interface FileEntity {
  /** 文件类型: FILE | DIRECTORY */
  type: "FILE" | "DIRECTORY";
  id: number;
  name: string;
  parent_id: number;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
}

export interface CreateNodeDto {
  /** 文件类型: FILE | DIRECTORY */
  type: "FILE" | "DIRECTORY";
  name: string;
  parent_id: number;
}
