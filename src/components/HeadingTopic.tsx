import { Heading } from "native-base"

type Props = {
  title: string
}

export function HeadingTopic({title}: Props){
  return (
    <Heading fontFamily="heading" fontSize="md" color="gray.600" mb={4}>
     {title}
    </Heading>
  )
}