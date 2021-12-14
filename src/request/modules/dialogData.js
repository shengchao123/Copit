import request from '../index'
import { getGlobalParams } from '@u/login'
import { urls } from '../urls'

export function getCockpitProductList (params) { // 获取优选产品列表
    return request({
        url: urls.getCockpitProductList,
        method: 'post',
        data: {
            ...params
        }
    })
}
export function findPopularLineList (params) { // 获取最受欢迎线路
    return request({
        url: urls.findPopularLineList,
        method: 'post',
        data: {
            ...params
        }
    })
}
export function getAllianceStatisticsList (params) { // 获取联盟活跃列表
    return request({
        url: urls.getAllianceStatisticsList,
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
