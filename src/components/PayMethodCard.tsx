import { Barcode, Bank, Money, QrCode, CreditCard} from 'phosphor-react-native'
import { HStack, useTheme, Text } from "native-base";


type PayMethodProps = {
  paymentMethod: {
    key: string;
    name: string;
  }
}

export function PayMethodCard({paymentMethod:{ key, name }}: PayMethodProps){
  const { sizes, colors } = useTheme()

  const iconSize = sizes[5]
  const iconsColor = colors.gray[600]
  return(
    <HStack alignItems="center">
      {
        key === 'boleto' ?
        <Barcode 
          size={iconSize}
          color={iconsColor}
        />
        : key === 'pix' ?
        <QrCode 
          size={iconSize}
          color={iconsColor}
        />
        : key === 'cash'?
        <Money 
          size={iconSize}
          color={iconsColor}
        />
        : key === 'card' ?
        <CreditCard 
          size={iconSize}
          color={iconsColor}
        />
        : key === 'deposit' ?
        <Bank 
          size={iconSize}
          color={iconsColor}
        /> :
        undefined
      }
      <Text
        fontFamily="body"
        fontSize='sm'
        color="gray.600"
        ml={2}
      >
        {name}
      </Text>
    </HStack>
  )
}