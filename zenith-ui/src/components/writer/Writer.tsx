import {Layout} from "@/components/layout/Layout.js";
import {Editor} from "@/components/writer/Editor.js";

export const Writer = () => {
    return (
        <>
            <Layout
                center={{
                    el: <Editor/>,
                    show: true,
                    fixed: false
                }}
            />
        </>
    )
}