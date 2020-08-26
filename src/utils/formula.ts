import { getBaseLog, float } from '@/utils/api';

// 插入损耗
export const gIL = (F: any, M: any, k1: any, k2: any, Lid: any, Rid: any) => {
    let g = F * 1000;
    Lid = Lid === '1' ? 0.06 : 0;
    Rid = Rid === '1' ? 0.06 : 0;
    let Val = (((k1 * Math.sqrt(g) + k2 * (F * 1000)) / 100) * M + Lid * Math.sqrt(F) + Rid * Math.sqrt(F)).toFixed(2);
    return Val
}

// 阻抗
export const gZo = (Vp: any, D: any, d: any, X: any) => {
    let Val = ((138 * Vp * getBaseLog((D / d) * X)) / 100).toFixed(2);
    return Val
}

// 时延
export const gTd = (Vp: any) => {
    let Val = ((3.33 / Vp) * 100).toFixed(2);
    return Val
}

//温度相位
