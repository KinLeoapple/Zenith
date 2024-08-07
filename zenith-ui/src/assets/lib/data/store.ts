import {configureStore} from '@reduxjs/toolkit';
import {blog_slice} from "@/assets/lib/data/reducer/blog/blog_slice.js";
import {blog_page_slice} from "@/assets/lib/data/reducer/blog/blog_page_slice.js";
import {blog_number_slice} from "@/assets/lib/data/reducer/blog/blog_number_slice.js";
import {condition_slice} from "@/assets/lib/data/reducer/blog/condition_slice.js";
import {blog_content_slice} from "@/assets/lib/data/reducer/blog/blog_content_slice.js";
import {login_state_slice} from "@/assets/lib/data/reducer/login_state_slice.js";
import {blog_filter_number_slice} from "@/assets/lib/data/reducer/blog/blog_filter_number_slice.js";
import {user_basic_info_slice} from "@/assets/lib/data/reducer/user_basic_info_slice.js";
import {search_keyword_slice} from "@/assets/lib/data/reducer/blog/search_keyword_slice.js";
import {show_search_result_slice} from "@/assets/lib/data/reducer/blog/show_search_result_slice.js";
import {side_bar_slice} from "@/assets/lib/data/reducer/dashboard/side_bar_slice.js";
import {blog_delete_slice} from "@/assets/lib/data/reducer/blog/blog_delete_slice.js";
import {blog_op_button_slice} from "@/assets/lib/data/reducer/blog/blog_op_button_slice.js";
import {location_slice} from "@/assets/lib/data/reducer/layout/location_slice.js";
import {drawer_open_slice} from "@/assets/lib/data/reducer/layout/drawer_open_slice";
import {selected_cover_image_slice} from "@/assets/lib/data/reducer/writer/selected_cover_image_slice";
import {cover_image_slice} from "@/assets/lib/data/reducer/writer/cover_image_slice";
import {cover_modal_open_slice} from "@/assets/lib/data/reducer/writer/cover_modal_open_slice.js";
import {editor_selection_slice} from "@/assets/lib/data/reducer/writer/editor_selection_slice";
import {editor_text_slice} from "@/assets/lib/data/reducer/writer/editor_text_slice";
import {editor_size_slice} from "@/assets/lib/data/reducer/writer/editor_size_slice";

export const store = configureStore({
    reducer: {
        blog: blog_slice.reducer,
        blogPage: blog_page_slice.reducer,
        blogNumber: blog_number_slice.reducer,
        blogFilterNumber: blog_filter_number_slice.reducer,
        blogContent: blog_content_slice.reducer,
        blogDelete: blog_delete_slice.reducer,
        blogOpButton: blog_op_button_slice.reducer,
        condition: condition_slice.reducer,
        searchKeyword: search_keyword_slice.reducer,
        loginState: login_state_slice.reducer,
        userBasicInfo: user_basic_info_slice.reducer,
        showSearchResult: show_search_result_slice.reducer,
        sideBar: side_bar_slice.reducer,
        location: location_slice.reducer,
        drawerOpen: drawer_open_slice.reducer,
        selectedCoverImage: selected_cover_image_slice.reducer,
        coverImage: cover_image_slice.reducer,
        coverModalOpen: cover_modal_open_slice.reducer,
        editorSelection: editor_selection_slice.reducer,
        editorText: editor_text_slice.reducer,
        editorSize: editor_size_slice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })

})