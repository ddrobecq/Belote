import { Card, Divider, Stack, Typography } from "@mui/material"

type TricksCardProps = {
    title: string,
    children: React.ReactNode
}

export default function TricksCard (props:TricksCardProps) {
  return (
    <Card sx={{ padding:1 }} >
        <Typography variant={'body1'} color={'primary'}>{props.title}</Typography>
        <Divider />
        <Stack marginTop={1}  >
            { props.children }
        </Stack>
    </Card>
  )
}


