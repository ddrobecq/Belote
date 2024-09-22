import { Card, Divider, Stack, Typography } from "@mui/material"

type ScoresCardProps = {
    title: string,
    children: React.ReactNode
    disabled?: boolean
}

export default function ScoreCard (props:ScoresCardProps) {
  const disabled = props.disabled || false;
  const color = disabled ? 'disabled' : 'primary';

  return (
    <Card sx={{ padding:1 }} >
        <Typography variant={'body1'} color={color}>{props.title}</Typography >
        <Divider />
        <Stack marginTop={1} >
            { props.children }
        </Stack>
    </Card>
  )
}


