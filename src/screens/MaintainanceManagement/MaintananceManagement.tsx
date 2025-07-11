import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import {
    Content,
    FuelingCard,
    CardHeader,
    CardTitle,
    CardSubtitle,
    CardDetailRow,
    CardDetail,
    DetailLabel,
    DetailValue,
    SummaryContainer,
    SummaryItem,
    SummaryLabel,
    SummaryValue,
    LoadingContainer,
} from './MaintainanceManagement.style';
import { MaintainanceDTO, MaintainanceProps } from './MaintainanceManagement.interface';
import { theme } from '@/src/theme/theme';
import { formatDate, getNewDate } from '@/src/utils';
import { ButtonContainer } from '@/src/components/Alert/Alert.styles';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from '@/src/components';

const MaintainanceManagement: React.FC<MaintainanceProps> = ({
    maintainanceRecords,
    isLoading = false,
}) => {
    
    const calculateTotalCost = (records: MaintainanceDTO[]) => {
        return records.reduce((total, record) => total + record.cost, 0);
    };

    const getAverageCostPerMaintainance = (records: MaintainanceDTO[]) => {
        if (records.length === 0) return 0;
        const totalCost = calculateTotalCost(records);
        return (totalCost / records.length).toFixed(2);
    };

    const dateHandler = (date: number[]) => {
        if (!date || date.length < 3) return 'Data inválida';
        const [year, month, day] = date;
        const formattedDate = new Date(year, month - 1, day);
        return formattedDate.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }

    const renderFuelingItem = ({ item }: { item: MaintainanceDTO }) => (
        <FuelingCard>
            <CardHeader>
                <View>
                    <CardTitle>{item.type}</CardTitle>
                    <CardSubtitle>{dateHandler(item.date)}</CardSubtitle>
                    {item.nextDueDate && (
                        <CardSubtitle>Próximo vencimento: {dateHandler(item.nextDueDate)}</CardSubtitle>
                    )}
                </View>
                <DetailValue>R$ {item.cost.toFixed(2)}</DetailValue>
            </CardHeader>

            <CardDetailRow>
                <CardDetail>
                    <DetailLabel>Oficina</DetailLabel>
                    <DetailValue>{item.workshopName}</DetailValue>
                </CardDetail>
                <CardDetail>
                    <DetailLabel>Quilometragem registrada</DetailLabel>
                    <DetailValue>{item.odometer} km</DetailValue>
                </CardDetail>
            </CardDetailRow>
        </FuelingCard>
    );

    return (
        <Content>
            {isLoading ? (
                <LoadingContainer>
                    <ActivityIndicator size="large" color={theme.colors.green} />
                </LoadingContainer>
            ) : maintainanceRecords.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <CardTitle>Nenhuma manutenção registrada</CardTitle>
                        <CardSubtitle>Você ainda não possui manutenções registradas.</CardSubtitle>
                        <Button
                            onPress={() => router.push('/Maintainances/Register')}
                            style={{ marginTop: 20 }}
                        >
                            Adicionar Manutenção
                        </Button>
                    </View>
                ) :
                    <>
                        <ButtonContainer>
                            <Dropdown
                                style={{ width: '90%' }}
                                data={[
                                    { label: 'Nova Manutenção', value: 'new', onPress: () => router.push('/Maintainances/Register')},
                                ]}
                                labelField="label"
                                valueField="value"
                                placeholder=" "
                                search={false}
                                onChange={(item) => {
                                    if (item.onPress) {
                                        item.onPress();
                                    }
                                }
                                }
                                renderRightIcon={() => <></>}
                                renderLeftIcon={() => <Ionicons name="menu" size={24} color="black" />}
                            />
                        </ButtonContainer>
                    <SummaryContainer>
                        <SummaryItem>
                            <SummaryLabel>Manutenções</SummaryLabel>
                            <SummaryValue>{maintainanceRecords.length}</SummaryValue>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryLabel>Custos Totais</SummaryLabel>
                            <SummaryValue>R$ {calculateTotalCost(maintainanceRecords)}</SummaryValue>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryLabel>Preço Médio / Manutenção</SummaryLabel>
                            <SummaryValue>
                                R$ {getAverageCostPerMaintainance(maintainanceRecords)}
                            </SummaryValue>
                        </SummaryItem>
                    </SummaryContainer>
                    <FlatList
                        data={maintainanceRecords}
                        renderItem={renderFuelingItem}
                        keyExtractor={item => item.id}
                    />
                    </>
                }
        </Content>
    );
};

export default MaintainanceManagement;