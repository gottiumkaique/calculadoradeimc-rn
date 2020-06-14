import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, SafeAreaView, TextInput, StatusBar, Platform } from "react-native"
import { Roboto_400Regular as Roboto, useFonts } from "@expo-google-fonts/roboto"

const App: React.FC = () => {
  const [fonts] = useFonts({
    Roboto,
  })

  const [weight, setWeight] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [calc, setCalc] = useState<number>(0)
  const [button, setButton] = useState<boolean>(false)
  const [colorImc, setColorImc] = useState<string>("")

  const imc: Function = (weight: number, height: number) => weight / height ** 2

  function handleClick() {
    setCalc(imc(weight, height).toFixed(2))
    setButton(true)
  }

  useEffect(() => {
    if (calc > 0) {
      if (calc < 18.5) {
        setColorImc("#ff0000")
      }else if (calc < 24.9) {
        setColorImc("#002070")
      }else if (calc < 29.9) {
        setColorImc("#ffdd00")
      }else if (calc < 39.9) {
        setColorImc("orange")
      }else if (calc > 40) {
        setColorImc("red")
      }
    }
  }, [calc])

  return (
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#002070" 
        translucent 
      />

      <SafeAreaView>
        <View>
          <View style={styles.header}>
            <Text style={styles.headerText}>Calculadora de IMC</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Calculadora de IMC</Text>
            <Text style={styles.description}>
              IMC é a sigla para Índice de Massa Corpórea, 
              parâmetro adotado pela Organização Mundial 
              de Saúde para calcular o peso ideal de cada pessoa.
            </Text>
            <TextInput 
              placeholder="Seu peso" 
              style={styles.input} 
              onChangeText={ num => setWeight(+num) }
              keyboardType="numeric"
            />
            <TextInput 
              placeholder="Sua altura" 
              style={styles.input} 
              onChangeText={ num => setHeight(+num) }
              keyboardType="numeric"
            />
            <View>
              <View style={styles.button} onTouchStart={handleClick}>
                <Text style={styles.buttonText}>Calcular IMC</Text>
              </View>
            </View>

            <View style={styles.result}>
              <Text style={styles.resultText}>
                {
                  button ? 
                    calc > 0 ? `O seu imc é ${String(calc).replace(".", ",")}` : "Digite um número válido!" : ""
                }
              </Text>
              <Text style={{color: colorImc, fontSize: 16}}>
                {
                  0 < calc 
                    ? calc < 18.5 ? "Magreza" : 
                    calc < 24.5 ? "Peso normal": 
                    calc < 29.9 ? "Sobrepeso" : 
                    calc < 39.9 ? "Obesidade 2": 
                    calc > 40 ? "Obesidade 3" : ""  : ""
                }
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

//Estilos do Aplicativo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  header: {
    marginTop: Platform.OS === "android" ? 25 : 0,
    height: 50,
    backgroundColor: "#002070"
  },
  headerText: {
    marginTop: 8,
    marginLeft: 20,
    color: "#fff",
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    color: "#002070",
    fontFamily: "Roboto",
  },
  description: {
    marginVertical: 10,
    color: "#555"
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    height: 50,
    width: 220,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    color: "#002070"
  },
  button: {
    position: "absolute",
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#002070",
    borderRadius: 24,
  },
  buttonText: {
    color: "#fff",
    textTransform: "uppercase",
  },
  result: {
    marginTop: 80,
  },
  resultText: {
    fontSize: 20,
  }
})

export default App