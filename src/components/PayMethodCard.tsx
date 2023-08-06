import { Barcode, Bank, Money, QrCode, CreditCard} from 'phosphor-react-native'
import { HStack, useTheme, Text } from "native-base";


type PayMethodProps = {
  payMethod: string;
}

export function PayMethodCard({ payMethod }: PayMethodProps){
  const { sizes, colors } = useTheme()

  const iconSize = sizes[5]
  const iconsColor = colors.gray[600]
  return(
    <HStack alignItems="center">
      {
        payMethod === 'boleto' ?
        <Barcode 
          size={iconSize}
          color={iconsColor}
        />
        : payMethod === 'pix' ?
        <QrCode 
          size={iconSize}
          color={iconsColor}
        />
        : payMethod === 'cash'?
        <Money 
          size={iconSize}
          color={iconsColor}
        />
        : payMethod === 'cartao' ?
        <CreditCard 
          size={iconSize}
          color={iconsColor}
        />
        : payMethod === 'deposito' ?
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
        {payMethod}
      </Text>
    </HStack>
  )
}