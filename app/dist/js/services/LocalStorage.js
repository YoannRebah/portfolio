class LocalStorage {

    static get PortfolioKey() {
        return 'portfolio-yr';
    }

    static get Data() {
        const data = JSON.parse(localStorage.getItem(LocalStorage.PortfolioKey));
        return data;
    }

    static SetData(key, value) {
        let data = LocalStorage.Data;
        if (!data) data = {};
        data[key] = value;
        const stringifiedData = JSON.stringify(data);
        localStorage.setItem(LocalStorage.PortfolioKey, stringifiedData);
    }

    init() {
        if(localStorage.getItem(LocalStorage.PortfolioKey) == null) this.StoreDefaultData();
    }

    StoreDefaultData() {
        const defaultData = {
            mainNavIsReduce: false,
        }
        localStorage.setItem(LocalStorage.PortfolioKey, JSON.stringify(defaultData));
    }
}