import request from '../index'
import { getGlobalParams } from '@u/login'
import { urls } from '../urls'

export function getBasicGovernance (params) { // 基层治理
  return request({
    url: urls.getBasicGovernance,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getCityCountrysideMerge (params) { // 城乡融合
  return request({
    url: urls.getCityCountrysideMerge,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyAllianceAbbreviationList (params) { // 联盟列表
  return request({
    url: urls.getJourneyAllianceAbbreviationList,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getMindJourney (params) { // 初心之旅
  return request({
    url: urls.getMindJourney,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getPartyUnion (params) { // 党建联盟
  return request({
    url: urls.getPartyUnion,
    method: 'post',
    data: {
      masterOrgId: getGlobalParams('masterOrgId'),
      ...params
    }
  })
}
export function getRedUnitaData (params) { // 红盟大数据
  return request({
    url: urls.getRedUnitaData,
    method: 'post',
    data: {
      masterOrgId: getGlobalParams('masterOrgId'),
      ...params
    }
  })
}
export function getTalentService (params) { // 人才服务
  return request({
    url: urls.getTalentService,
    method: 'post',
    data: {
      masterOrgId: getGlobalParams('masterOrgId'),
      ...params
    }
  })
}
