import { Barcode, Bank, Money, QrCode, CreditCard} from 'phosphor-react-native'
import { HStack, useTheme, Text } from "native-base";


type PayMethodProps = {
  paymentMethod?: {
    key: string;
    name: string;
  }
  value?: string;
}

export function PayMethodCard({paymentMethod, value}: PayMethodProps){
  const { sizes, colors } = useTheme()

  const iconSize = sizes[5]
  const iconsColor = colors.gray[600]
  return(
    <HStack alignItems="center">
      {
        paymentMethod?.key === 'boleto' || value === 'boleto' ?
        <Barcode 
          size={iconSize}
          color={iconsColor}
        />
        : paymentMethod?.key  === 'pix' || value === 'pix' ?
        <QrCode 
          size={iconSize}
          color={iconsColor}
        />
        : paymentMethod?.key  === 'cash'  || value === 'cash'?
        <Money 
          size={iconSize}
          color={iconsColor}
        />
        : paymentMethod?.key === 'card' || value === 'card' ?
        <CreditCard 
          size={iconSize}
          color={iconsColor}
        />
        : paymentMethod?.key === 'deposit' || value === 'deposit' ?
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
        {paymentMethod?.name ? paymentMethod.name : value}
      </Text>
    </HStack>
  )
}