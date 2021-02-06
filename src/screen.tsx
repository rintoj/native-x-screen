import { BackgroundColorStyleProps, COLOR, useContainerStyle } from 'native-x-theme'
import React, { ReactNode, useEffect, useMemo, useRef } from 'react'
import { Keyboard, Platform, ScrollView, TextInput, View } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { withSafeArea } from 'react-native-safe-area'
import { styles as s } from 'tachyons-react-native'

const SafeAreaWithBottomPadding = withSafeArea(View, 'padding', 'bottom')
const SafeAreaWithVerticalPadding = withSafeArea(View, 'padding', 'vertical')

const { State: TextInputState } = TextInput
const INPUT_OFFSET = 200

export interface ScreenProps extends BackgroundColorStyleProps {
  scrollable?: boolean
  fill?: boolean
  hasForm?: boolean
  header?: ReactNode
  children: ReactNode | ReactNode[]
  keepKeyboard?: boolean
}

const styles = {
  container: [s.flex, s.w100, s.h100],
  content: [s.flex, s.w100, s.h100, { flexGrow: 1 }],
  spacer: [s.pa1],
}

export function Screen({
  scrollable,
  fill = true,
  hasForm,
  header,
  children,
  backgroundColor = COLOR.PRIMARY,
  keepKeyboard,
}: ScreenProps) {
  const scrollViewRef = useRef<ScrollView>(null)
  const SafeArea = useMemo(
    () => (scrollable ? View : header ? SafeAreaWithBottomPadding : SafeAreaWithVerticalPadding),
    [header, scrollable],
  )
  const content = hasForm ? (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      keyboardShouldPersistTaps={keepKeyboard ? 'always' : 'handled'}
      keyboardDismissMode={keepKeyboard ? 'none' : 'on-drag'}
      contentContainerStyle={fill ? styles.content : undefined}
      scrollEventThrottle={16}
    >
      {children}
      {Platform.OS === 'ios' && <KeyboardSpacer />}
    </ScrollView>
  ) : (
    children
  )

  useEffect(() => {
    const onKeyboardShow = () => {
      const currentlyFocusedField = TextInputState?.currentlyFocusedInput?.()
      const scrollView = scrollViewRef.current
      if (currentlyFocusedField == null || scrollView == null) {
        return
      }
      currentlyFocusedField?.measure((_x, _y, _w, _h, _left, top) => {
        if (Platform.OS === 'ios') {
          scrollView?.scrollTo({ y: top - INPUT_OFFSET })
        }
      })
    }
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', onKeyboardShow)
    return () => keyboardDidShowListener.remove()
  }, [scrollViewRef])

  const screenStyle = useContainerStyle({ backgroundColor })
  const containerStyle = useMemo(() => {
    return [...styles.container, screenStyle]
  }, [screenStyle])

  return (
    <View style={containerStyle}>
      {header && <View style={styles.spacer} />}
      {header}
      <SafeArea style={containerStyle}>{content}</SafeArea>
    </View>
  )
}
