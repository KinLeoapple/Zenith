import {Card, Chip, Divider, Grid, Typography} from "@mui/joy";
import ChipDelete from "@mui/joy/ChipDelete";
import {useDispatch, useSelector} from "react-redux";
import {ConditionType, remove, selectCondition} from "@/assets/lib/data/reducer/blog/condition_slice.js";
import {to_date} from "@/assets/lib/utils/to_date.js";

export const Condition = () => {
    const conditions = useSelector(selectCondition);
    const dispatch = useDispatch();

    function removeCondition(condition) {
        dispatch(remove(condition));
    }

    function formatOutput(item) {
        switch (item.type) {
            case ConditionType.Category:
                return item.condition;
            case ConditionType.Date:
                return to_date(item.condition);
            case ConditionType.Title:
                return item.condition;
            case ConditionType.Description:
                return item.condition;
        }
    }

    return (
        <>
            {conditions.length > 0 &&
                <Card color="primary" variant="soft" className={'select-none mb-5'}
                      sx={{
                          boxShadow: "lg",
                      }}>
                    <Typography level="title-lg">Filters</Typography>
                    <Divider inset="none"/>

                    <Grid container spacing={0.5}>
                        {
                            conditions.map((item, i) => (
                                <Grid xs={"auto"} key={i}>
                                    <Chip
                                        variant="outlined"
                                        color="primary"
                                        endDecorator={<ChipDelete onDelete={() => removeCondition(item)}/>}
                                    >
                                        {formatOutput(item)}
                                    </Chip>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Card>
            }
        </>
    )
}