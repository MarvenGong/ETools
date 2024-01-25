declare const vertify: {
    isURL: (strUrl: string) => boolean;
    isEmpty: (str: string) => boolean;
    isDigit: (value: string) => boolean;
    isTelephone: (phone: string) => boolean;
    isMobile: (mobile: string) => boolean;
    isQQ: (qq: string) => boolean;
    isEmail: (email: string) => boolean;
    isIDCard: (str: string) => boolean;
    isPlusDigit: (digit: string) => boolean;
    isChinese: (str: string) => boolean;
    isDate: (datestr: string) => boolean;
    isPostalCode: (s: string) => boolean;
    isRegisterUserName: (s: any) => boolean;
    isTrueName: (s: string) => boolean;
    isPassword: (s: string) => boolean;
};
export default vertify;
