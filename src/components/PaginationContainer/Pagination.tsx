import {FC, useCallback, useEffect, useState} from "react";

import {ISkipLimitValues} from "../../interfaces";

interface IProps{
    page:number,
    totalPages: number,
    onSetSkipLimit: (prevState:ISkipLimitValues) => void,
    setQuery: Function,
    skipLimitValues:ISkipLimitValues,
    totalItems: number,
    limitPerPage:number
}
const Pagination:FC<IProps> = ({page, totalPages, onSetSkipLimit, setQuery, skipLimitValues, totalItems, limitPerPage}) => {

    const [visiblePages, setVisiblePages] = useState<number[]>([]);
    const [activePage, setActivePage] = useState<number>(page - 1);

    const buildPages = useCallback(()=>{
        const newPages = [];

        if (totalPages <= 3){
            for (let i = 0; i < totalPages; i++) {
                newPages.push(i);
            }
        }else {
            const maxVisiblePages = 3;
            const startRangeOfLastVisiblePages = totalPages - maxVisiblePages;
            const startVisibleRange = activePage - Math.floor(maxVisiblePages / 2);

            let start = Math.max(0, Math.min(startRangeOfLastVisiblePages, startVisibleRange));
            let end;

            if (activePage === startRangeOfLastVisiblePages){
                end = (start + maxVisiblePages) + 1;
            }else {
                end = start + maxVisiblePages;
            }

            for (let i = start; i < end; i++) {
                newPages.push(i);

            }
        }
        setVisiblePages(newPages);

    }, [activePage, totalPages]);

    useEffect(() => {
        setActivePage(+`${page - 1}`);
    }, [page]);

    useEffect(() => {
        buildPages();
    }, [activePage, buildPages]);

    const previousPage = () =>{
            onSetSkipLimit({...skipLimitValues,
                skip: skipLimitValues.skip - limitPerPage,
                limit: limitPerPage
            });

        setQuery((prev: { set: (arg0: string, arg1: string) => void; })=> {
            prev.set("page",`${page - 1}`);
            return prev;
        });
    }
    const nextPage = () =>{
        onSetSkipLimit({...skipLimitValues,
            skip: skipLimitValues.skip + limitPerPage,
            limit: limitPerPage
        });
        setQuery((prev: { set: (arg0: string, arg1: string) => void; })=> {
            prev.set("page",`${page + 1}`);
            return prev;
        });
    }

    const selectPage = (visiblePage:number) =>{

        onSetSkipLimit({...skipLimitValues,
            skip: visiblePage * limitPerPage,
            // limit: page === totalPages ? limitPerPage : Math.min(limitPerPage, totalItems - skipLimitValues.skip)
            limit: limitPerPage
        });
        setQuery((prev: { set: (arg0: string, arg1: string) => void; })=> {
            prev.set("page",`${visiblePage + 1}`);
            return prev;
        });
    }


    return (
        <div className={"d-flex justify-content-center"}>
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={previousPage}>Previous</button>
                    </li>

                    {visiblePages[0] !== 0 &&(
                        <li className={`page-item ${+page === 1  ? 'active' : ''}`}>
                            <button className="page-link"  onClick={()=>selectPage(0)}>1</button>
                        </li>
                    )}

                    {visiblePages[0] > 1 &&(
                        <li className={`page-item`}>
                            <button className="page-link">...</button>
                        </li>
                    )}

                    {visiblePages.map(visiblePage=>
                        <li className={`page-item ${visiblePage === activePage ? 'active' : ''}`}
                            key={visiblePage}
                            onClick={()=>selectPage(visiblePage)}>
                            <button className="page-link">{visiblePage + 1}</button>
                        </li>)}

                    {totalPages > 4 && activePage < totalPages - 3 &&(
                        <li className={`page-item`}>
                            <button className="page-link">...</button>
                        </li>
                    )}
                    {totalPages > 3 && activePage < totalPages - 3 &&(
                        <li className={`page-item ${totalPages - 1 === activePage ? 'active' : ''}`}>
                            <button className="page-link"  onClick={()=>selectPage(totalPages - 1)}>{totalPages}</button>
                        </li>
                    )}

                    <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link"  onClick={nextPage}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export {Pagination};