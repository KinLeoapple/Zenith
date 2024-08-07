import {ResultList} from "@/components/blog/ResultList.jsx";

export const SearchResult = () => {
    return (
        <div className={'mb-10'}>
            <ResultList id={"resultList"} search={true}/>
        </div>
    )
}