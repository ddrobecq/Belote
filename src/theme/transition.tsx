import React from "react";
import { forwardRef } from "react";

import { Slide, SlideProps } from '@mui/material';

const Transition = forwardRef(function Transition(props:SlideProps, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default Transition;