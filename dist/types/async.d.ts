declare const async: {
    /**
       * 在异步函数中等待指定的时间
       * @param timestamp 等待的时间的毫秒数
       */
    wait: (timestamp: any) => Promise<unknown>;
};
export default async;
