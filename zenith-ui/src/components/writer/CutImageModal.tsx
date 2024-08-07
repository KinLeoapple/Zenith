import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    type Crop,
    makeAspectCrop,
    PercentCrop,
    PixelCrop
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {DependencyList, useEffect, useRef, useState} from "react";
import {Box, Button, DialogContent, DialogTitle, Divider, Modal, ModalClose, ModalDialog} from "@mui/joy";
import {useDispatch, useSelector} from "react-redux";
import {
    selectSelectedCoverImage,
    setSelectedCoverImageValue
} from "@/assets/lib/data/reducer/writer/selected_cover_image_slice";
import defaultImg from "@/assets/img/img.min.webp";
import {Done} from "@mui/icons-material";
import {selectCoverImage, setCoverImageValue} from "@/assets/lib/data/reducer/writer/cover_image_slice";
import {selectCoverModalOpen, setCoverModalOpenValue} from "@/assets/lib/data/reducer/writer/cover_modal_open_slice";

function useDebounceEffect(
    fn: () => void,
    waitTime: number,
    deps?: DependencyList,
) {
    useEffect(() => {
        const t = setTimeout(() => {
            if (deps)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            { // @ts-expect-error
                // eslint-disable-next-line prefer-spread
                fn.apply(undefined, deps)
            }
        }, waitTime)

        return () => {
            clearTimeout(t)
        }
    }, deps);
}

function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

export const CutImageModal = () => {
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [scale] = useState(1);
    const [rotate] = useState(0);
    const [aspect] = useState<number>(16 / 9);
    const dispatch = useDispatch();
    const selectedCoverImage = useSelector(selectSelectedCoverImage);
    const coverImage = useSelector(selectCoverImage);
    const coverModalOpen = useSelector(selectCoverModalOpen);
    const isInitRender = useRef(true);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [flexDirection, setFlexDirection] = useState<"row" | "column">();

    useEffect(() => {
        if (selectedCoverImage || selectedCoverImage !== "")
            dispatch(setCoverModalOpenValue(true));
        else
            dispatch(setCoverModalOpenValue(false));
        isInitRender.current = true;
    }, [selectedCoverImage]);

    useDebounceEffect(
        async () => {
            if (
                crop?.width &&
                crop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                if (coverModalOpen) {
                    canvasPreview(
                        imgRef.current,
                        previewCanvasRef.current,
                        convertToPixelCrop(
                            crop,
                            imgRef.current.width,
                            imgRef.current.height,
                        ),
                        scale,
                        rotate,
                    );
                    isInitRender.current = false;
                }
            }
        },
        100,
        [crop, coverModalOpen],
    );

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                if (!isInitRender.current)
                    canvasPreview(
                        imgRef.current,
                        previewCanvasRef.current,
                        completedCrop,
                        scale,
                        rotate,
                    );
            }
        },
        100,
        [completedCrop, scale, rotate],
    );

    async function canvasPreview(
        image: HTMLImageElement,
        canvas: HTMLCanvasElement,
        crop: PixelCrop,
        scale = 1,
        rotate = 0,
    ) {
        const ctx = canvas.getContext('2d');

        if (ctx) {
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;

            const pixelRatio = window.devicePixelRatio;
            // const pixelRatio = 1

            canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
            canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

            ctx.scale(pixelRatio, pixelRatio);
            ctx.imageSmoothingQuality = 'high';

            const cropX = crop.x * scaleX;
            const cropY = crop.y * scaleY;

            const rotateRads = rotate * Math.PI / 180;
            const centerX = image.naturalWidth / 2;
            const centerY = image.naturalHeight / 2;

            ctx.save();

            ctx.translate(-cropX, -cropY);
            ctx.translate(centerX, centerY);
            ctx.rotate(rotateRads);
            ctx.scale(scale, scale);
            ctx.translate(-centerX, -centerY);
            ctx.drawImage(
                image,
                0,
                0,
                image.naturalWidth,
                image.naturalHeight,
                0,
                0,
                image.naturalWidth,
                image.naturalHeight,
            );

            ctx.restore();
        }
    }

    function onCropChange(crop: PercentCrop) {
        setCrop(crop);
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement, Event>) {
        if (aspect) {
            const {width, height} = e.currentTarget;
            if (width > height) {
                setFlexDirection("column");
            } else {
                setFlexDirection("row");
            }
            const newCrop = centerAspectCrop(width, height, aspect);
            setCrop(newCrop);
        }
    }

    function onModalClose() {
        if (coverImage || coverImage !== "")
            dispatch(setSelectedCoverImageValue(""));
        dispatch(setCoverModalOpenValue(false));
    }

    function onContinueClick() {
        const image = imgRef.current;
        const previewCanvas = previewCanvasRef.current;
        if (image && previewCanvas && completedCrop) {

            const scaleX = image.naturalWidth / image.width
            const scaleY = image.naturalHeight / image.height

            const offscreen = new OffscreenCanvas(
                completedCrop.width * scaleX,
                completedCrop.height * scaleY,
            )
            const ctx = offscreen.getContext('2d')
            if (ctx) {

                ctx.drawImage(
                    previewCanvas,
                    0,
                    0,
                    previewCanvas.width,
                    previewCanvas.height,
                    0,
                    0,
                    offscreen.width,
                    offscreen.height,
                );

                offscreen.convertToBlob({
                    type: 'image/jpeg',
                    quality: 1
                }).then(blob => {
                    if (coverImage) {
                        URL.revokeObjectURL(coverImage);
                    }
                    dispatch(setCoverImageValue(URL.createObjectURL(blob)));
                    dispatch(setCoverModalOpenValue(false));
                });
            }
        }
    }

    return (
        <Modal keepMounted open={coverModalOpen} onClose={onModalClose}>
            <ModalDialog color={"primary"} variant={"outlined"}>
                <ModalClose color={"danger"} variant={"solid"}/>
                <DialogTitle className={'capitalize'}>Adjust Image</DialogTitle>
                <Divider inset="none"/>
                <DialogContent sx={{
                    padding: 2,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: flexDirection,
                    justifyContent: "space-between",
                }}>
                    <Box>
                        <ReactCrop crop={crop}
                                   aspect={16 / 9}
                                   onChange={(_, percentCrop) => onCropChange(percentCrop)}
                                   onComplete={(crop, percentCrop) => setCompletedCrop(
                                       convertToPixelCrop(
                                           percentCrop,
                                           imgRef?.current!.width,
                                           imgRef?.current!.height
                                       )
                                   )}>
                            <img ref={imgRef} src={coverModalOpen ? selectedCoverImage : defaultImg}
                                 onLoad={onImageLoad} alt=""/>
                        </ReactCrop>
                    </Box>
                    <Divider orientation={"vertical"}/>
                    <Box display="flex"
                         flexDirection={flexDirection === "column" ? "row" : "column"}
                         justifyContent="space-around" gap={2}>
                        {!!completedCrop &&
                            <canvas
                                ref={previewCanvasRef}
                                style={{
                                    objectFit: 'contain',
                                    width: 300,
                                    height: 300 / 16 * 9,
                                }}
                            />}
                        <Box
                            display={"flex"}
                            flexDirection={flexDirection}
                            flexGrow={1}
                            justifyContent={"flex-end"}
                            alignItems="flex-end">
                            <Button className={'capitalize'}
                                    size={"sm"}
                                    color={"primary"}
                                    variant={"solid"}
                                    onClick={onContinueClick}
                                    startDecorator={
                                        <Done/>
                                    }
                                    sx={{
                                        minWidth: 100
                                    }}>
                                Continue
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </ModalDialog>
        </Modal>

    );
};