import {Badge, List, ListItem, ListItemButton, Typography} from "@mui/joy";
import {useEffect, useState} from "react";
import {get_category, get_category_all, get_category_number} from "@/assets/lib/api/api.ts";
import {useDispatch, useSelector} from "react-redux";
import {
    selectCondition,
    append,
    newCondition,
    remove,
    ConditionType
} from "@/assets/lib/data/reducer/blog/condition_slice.js";
import {newSearchBlogKeyword, setSearchBlogKeyword} from "@/assets/lib/data/reducer/blog/search_keyword_slice.js";
import {setShowResultValue} from "@/assets/lib/data/reducer/blog/show_search_result_slice.js";

export const CategoriesList = () => {
    const conditions = useSelector(selectCondition);
    const dispatch = useDispatch();
    const [categories, setCategories] = useState({data: [], refresh: true});

    useEffect(() => {
        let list = [];
        get_category_all().then(r => {
            if (r !== null) {
                for (let i in r) {
                    Promise.all([get_category(r[i].id), get_category_number(r[i].id)]).then(arr => {
                        if (arr[1].count > 0) {
                            arr[0].number = arr[1].count;
                            list.push(arr[0]);
                            setCategories({data: list, refresh: true});
                        }
                    });
                }
            }
        });
    }, [categories.refresh]);

    function selectedCategory(name) {
        if (isSelected(name)) {
            dispatch(remove(newCondition(ConditionType.Category, name)));
        } else {
            dispatch(append(newCondition(ConditionType.Category, name)));
            dispatch(setSearchBlogKeyword(newSearchBlogKeyword("")));
            dispatch(setShowResultValue(false));
        }
    }

    function isSelected(name) {
        let isSelected = false;
        for (let i = 0; i < conditions.length; i++) {
            let item = conditions[i];
            if (item.type === ConditionType.Category && item.condition === name) {
                isSelected = true;
                break;
            }
        }
        return isSelected;
    }

    return (
        <>
            <List
                className={'select-none'}
                size="lg"
                color="primary"
                variant="plain"
                sx={{
                    "--List-gap": "5px"
                }}
            >
                <Typography level="h4" color="neutral">
                    <span style={{
                        fontSize: 'x-large'
                    }}>C</span>ategory
                </Typography>
                {categories.data.length > 0 && categories.data.sort((a, b) => {
                    return a.catName.toLowerCase()
                        .localeCompare(b.catName.toLowerCase());
                }).map((category, i) => (
                    <ListItem tabIndex={-1} key={i} className={`cursor-pointer select-none`} sx={{
                        width: '100%'
                    }}>
                        <ListItemButton
                            tabIndex={-1}
                            onClick={() => selectedCategory(category.catName)}
                            selected={isSelected(category.catName)}
                            color={"primary"}
                            className={'flex flex-row justify-between'} sx={{
                            borderRadius: '6px'
                        }}>
                            <Typography noWrap className={`text-base font-bold`}
                                        sx={{
                                            color: "inherit"
                                        }}
                            >{category.catName}</Typography>
                            <Badge variant="soft" size="sm" badgeContent={category.number} sx={{
                                '--Badge-ring': '0 0 0 0'
                            }}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    )
}