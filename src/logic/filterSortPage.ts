import { GridFilterModelParams, GridPageChangeParams, GridSortModelParams } from "@material-ui/data-grid";

const getFilterOperator = (operator?: string) => {
    switch (operator) {
        case "contains":
            return "contain";
        case "equals":
            return "";
        default:
            return operator;
    }
};

const generateFilter = (filters?: GridFilterModelParams) => {
    if (!filters) return;

    const filterList = filters.filterModel.items;
    if (filterList[0]?.value) {
        const operator = getFilterOperator(filterList[0]?.operatorValue);
        const filterName = filterList[0].columnField;
        const filterValue = filterList[0].value;

        return `${operator}${filterName}=${filterValue}`;
    }
};

const generatePage = (page?: GridPageChangeParams) => {
    if (!page || page.page === 0) return "page=1";

    let res = `page=${page.page}`;
    if (page.pageSize) {
        res += `&pageSize=${page.pageSize}`;
    }

    return res;
};

const generateSorts = (sorts?: GridSortModelParams) => {
    if (!sorts) return;

    const { sortModel } = sorts;
    let res = "";
    if (sortModel[0] && sortModel[0].field) {
        res += `sort=${sortModel[0].field}&sortType=${sortModel[0].sort}`;
    }

    return res;
};

export const generateURL = (
    url: string,
    filters?: GridFilterModelParams,
    sorts?: GridSortModelParams,
    page?: GridPageChangeParams,
    defaultParams?:string,
) => {
    let params: string[] = [];

    if (!filters && !sorts && !page) return `${url}?${defaultParams}`;

    if (filters || sorts || page) url += `?${defaultParams}&`;

    const generatedPage = generatePage(page);
    const generatedFilters = generateFilter(filters);
    const generatedSorts = generateSorts(sorts);

    if (generatedPage) {
        params.push(generatedPage);
    }
    if (generatedFilters) {
        params.push(generatedFilters);
    }
    if (generatedSorts) {
        params.push(generatedSorts);
    }
    url += params.join("&");

    return url;
};
