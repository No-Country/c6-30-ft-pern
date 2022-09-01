import React from "react";
import { View, TextInput, TouchableWithoutFeedback, Text } from "react-native";

import { Formik } from "formik";
import * as Yup from "yup";

import { CheckBox } from "../../CheckBox/CheckBox";

// Styles
import globalStyles from "../../../globalStyles/globalStyles";
import { styles } from "./styles";
// Hooks
import { useAuth } from "../../../hooks/useAuth";
// Utils
import { arrayDate } from "../../../utils/arrayDate";

export const ServiceForm = ({navigation}) => {

  const { authData } = useAuth();

  const initialValues = {
    name: "",
    category: "",
    value: "",
    description: "",
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    from: "",
    to: "",
  };

  const required = "*Campo obligatorio";

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, "*La cantidad mínima de caracteres es 6.")
      .required(required),
    category: Yup.string().required(required),
    value: Yup.string(),
    description: Yup.string().required(required),
    from: Yup.number()
      .integer("*Debe ser un número entero")
      .required(required)
      .max(23, "*Debe ser un número menor a 23")
      .min(0, "Debe ser un número mayor o igual a 0"),
    to: Yup.number()
      .integer("*Debe ser un número entero")
      .required(required)
      .max(23, "*Debe ser un número menor a 24")
      .min(0, "Debe ser un número mayor a 0"),
  });

  const onSubmit = async (values, {resetForm}) => {
    const sendValues = {
      user: authData.user,
      name: values.name,
      category: values.category,
      value: values.value,
      description: values.description,
      date: {
        monday: values.monday ? arrayDate(values.from, values.to) : null,
        tuesday: values.tuesday ? arrayDate(values.from, values.to) : null,
        wednesday: values.wednesday ? arrayDate(values.from, values.to) : null,
        thursday: values.thursday ? arrayDate(values.from, values.to) : null,
        friday: values.friday ? arrayDate(values.from, values.to) : null,
        saturday: values.saturday ? arrayDate(values.from, values.to) : null,
        sunday: values.sunday ? arrayDate(values.from, values.to) : null,
      },
    };
    await fetch("https://quickly-a.herokuapp.com/api/service", {
      method: 'POST',
      body: JSON.stringify(sendValues),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        navigation.navigate("HomeSupplier", {'newService': 'created'});
      }
    })
    .catch(error => console.log(error))
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldValue,
        errors,
        touched
      }) => (
        <View>
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Nombre</Text>
            <TextInput
              style={
                errors.name && touched.name
                  ? [globalStyles.inputError, globalStyles.input]
                  : globalStyles.input
              }
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values?.name}
            />
            {errors.name && touched.name && (
              <Text style={globalStyles.textError}>{errors.name}</Text>
            )}
          </View>
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Categoría</Text>
            <TextInput
              style={
                errors.category && touched.category
                  ? [globalStyles.inputError, globalStyles.input]
                  : globalStyles.input
              }
              onChangeText={handleChange("category")}
              onBlur={handleBlur("category")}
              value={values?.category}
            />
            {errors.category && touched.category && (
              <Text style={globalStyles.textError}>{errors.category}</Text>
            )}
          </View>
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Precio</Text>
            <TextInput
              style={
                errors.value && touched.value
                  ? [globalStyles.inputError, globalStyles.input]
                  : globalStyles.input
              }
              onChangeText={handleChange("value")}
              onBlur={handleBlur("value")}
              value={values?.value}
            />
            {errors.value && touched.value &&  (
              <Text style={globalStyles.textError}>{errors.value}</Text>
            )}
          </View>
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Descripción</Text>
            <TextInput
              style={
                errors.description && touched.description
                  ? [globalStyles.inputError, globalStyles.input]
                  : globalStyles.input
              }
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values?.description}
            />
            {errors.description && touched.description && (
              <Text style={globalStyles.textError}>{errors.description}</Text>
            )}
          </View>
          <Text style={globalStyles.label}>Días</Text>
          <View style={styles.days}>
            <View style={styles.day}>
              <CheckBox
                value={values?.monday}
                handleChange={(nextValue) => setFieldValue("monday", nextValue)}
              >
                Lunes
              </CheckBox>
            </View>
            <View style={styles.day}>
              <CheckBox
                value={values?.tuesday}
                handleChange={(nextValue) =>
                  setFieldValue("tuesday", nextValue)
                }
              >
                Martes
              </CheckBox>
            </View>
            <View style={styles.day}>
              <CheckBox
                value={values?.wednesday}
                handleChange={(nextValue) =>
                  setFieldValue("wednesday", nextValue)
                }
              >
                Miércoles
              </CheckBox>
            </View>
            <View style={styles.day}>
              <CheckBox
                value={values?.thursday}
                handleChange={(nextValue) =>
                  setFieldValue("thursday", nextValue)
                }
              >
                Jueves
              </CheckBox>
            </View>
            <View style={styles.day}>
              <CheckBox
                value={values?.friday}
                handleChange={(nextValue) => setFieldValue("friday", nextValue)}
              >
                Viernes
              </CheckBox>
            </View>
            <View style={styles.day}>
              <CheckBox
                value={values?.saturday}
                handleChange={(nextValue) =>
                  setFieldValue("saturday", nextValue)
                }
              >
                Sábado
              </CheckBox>
            </View>
            <View style={styles.day}>
              <CheckBox
                value={values?.sunday}
                handleChange={(nextValue) => setFieldValue("sunday", nextValue)}
              >
                Domingo
              </CheckBox>
            </View>
          </View>
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Desde</Text>
            <TextInput
              style={
                errors.from && touched.from
                  ? [globalStyles.inputError, globalStyles.input]
                  : globalStyles.input
              }
              onChangeText={handleChange("from")}
              onBlur={handleBlur("from")}
              value={values?.from}
              keyboardType="numeric"
              maxLength={2}
            />
            {errors.from && touched.from && (
              <Text style={globalStyles.textError}>{errors.from}</Text>
            )}
          </View>
          <View style={globalStyles.inputContainer}>
            <Text style={globalStyles.label}>Hasta</Text>
            <TextInput
              style={
                errors.to && touched.to
                  ? [globalStyles.inputError, globalStyles.input]
                  : globalStyles.input
              }
              onChangeText={handleChange("to")}
              onBlur={handleBlur("to")}
              value={values?.to}
              keyboardType="numeric"
              maxLength={2}
            />
            {errors.to && touched.to && (
              <Text style={globalStyles.textError}>{errors.to}</Text>
            )}
          </View>
          <TouchableWithoutFeedback onPress={handleSubmit}>
            <View style={[globalStyles.button, globalStyles.normalButton]}>
              <Text style={globalStyles.textButton}>Crear</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </Formik>
  );
};
