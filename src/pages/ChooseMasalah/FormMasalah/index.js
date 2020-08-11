import { ScrollView, StyleSheet, View, React } from '@libraries';
import { Button, Gap, Header, Input } from '@components';
import { colors, useForm, showError, routeConstant } from '@utils';
import { createMasalah, editMasalah } from '@services';

const FormMasalah = ({ route, navigation }) => {
  const { isEdit, category, id, dataEdit, onGoBack } = route.params;

  const initialForm = {
    title: isEdit ? dataEdit.title : '',
    description: isEdit ? dataEdit.description : ''
  };

  const [form, setForm] = useForm(initialForm);

  const onSave = async () => {
    if (!form.title || !form.description) {
      return showError('Form tidak boleh kosong!');
    }

    if (isEdit) {
      await editMasalah(category.id, id, form);
    } else {
      await createMasalah(category.id, form);
    }
    setForm('reset');
    navigation.navigate(routeConstant.CHOOSEMASALAH, {
      updateScreen: Math.random(100)
    });
  };

  const headerTitle = isEdit
    ? `Ubah Masalah ${category.name}`
    : `Tambah Masalah ${category.name}`;

  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.goBack()} title={headerTitle} />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="Judul Masalah"
            value={form.title}
            onChangeText={value => setForm('title', value)}
            placeholder="Jenis / Nama masalah"
          />
          <Gap height={24} />
          <Input
            label="Keterangan"
            value={form.description}
            onChangeText={value => setForm('description', value)}
            placeholder="Deskripsi masalah"
            style={styles.textArea}
            inputProps={{
              numberOfLines: 3,
              multiline: true
            }}
          />
          <Gap height={40} />
          <Button title={isEdit ? 'Update' : 'Save'} onPress={onSave} />
          <Gap height={80} />
        </ScrollView>
      </View>
    </View>
  );
};

export default FormMasalah;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  content: { paddingHorizontal: 40, flex: 1 },
  textArea: {
    textAlignVertical: 'top'
  }
});
