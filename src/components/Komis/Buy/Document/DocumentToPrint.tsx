import React, {SetStateAction, useEffect, useRef, useState} from 'react';
import ReactToPrint from 'react-to-print';

import {Branch, CarBuy, Company, ConsumerArrangement} from 'types';

import {config} from '../../../../config/config';
import {Button} from '../../../common/Button/Button';

import style from './DocumentToPrint.module.css';
import styleBtn from '../../../common/Button/Button.module.css';

interface Props {
    car: CarBuy;
    consumer: ConsumerArrangement;
    branch: string;
    setPrinting: React.Dispatch<SetStateAction<boolean>>;
}

export const DocumentToPrint = ({car, consumer, branch, setPrinting}: Props) => {

    const componentRef = useRef<HTMLDivElement>(null);
    const [branchData, setBranchData] = useState<Branch | null>(null);
    const [companyData, setCompanyData] = useState<Company>({
        name: '',
        city: '',
        postCode: '',
        address: '',
        phone: '',
        nip: '',
        regon: '',
    });
    console.log(config);
    useEffect(() => {
        (async () => {
            const companyRes = await fetch(`${config.URL}company`);
            const companyData = await companyRes.json();
            setCompanyData(companyData);
            const branchRes = await fetch(`${config.URL}branches/getcity/${branch}`);
            const branchData = await branchRes.json();
            setBranchData(branchData);
        })();
    }, []);

    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const fullDate = `${day < 10 ? '0' + day : day},${month < 10 ? '0' + month : month},${date.getFullYear()} `;


    const handleCansel = () => {
        setPrinting(false);
    };

    return (
        <div className={style.container}>
            <div className={style.btnBox}>
                <ReactToPrint
                    trigger={() => <button className={styleBtn.btn}>Drukuj umowę</button>}
                    content={() => componentRef.current}
                    documentTitle="Umowa sprzedaży"
                    pageStyle="@page {size: A4; margin:0 0 50px 0}"
                />
                <Button
                    type="button"
                    textName="Anuluj"
                    click={handleCansel}
                />
            </div>
            <div ref={componentRef} className={style.box}>
                <h2>umowa kupna/sprzedaży samochodu</h2>
                <p className={style.paragraph}>zawarta w dniu {fullDate} w {branchData?.city} </p>
                <p><span>Sprzedający:</span></p>
                <div className={style.textBox}>
                    <p>{consumer.name}</p>
                    <p>{consumer.pesel !== '' ? `PESEL: ${consumer.pesel}` : `NIP: ${consumer.nip}`}</p>
                    <p>Dokument: {consumer.document} nr: {consumer.documentId}</p>
                    <p>Adres: {consumer.address}, {consumer.postCode}, {consumer.city} </p>
                </div>

                <p><span>Kupujący:</span></p>
                <div className={style.textBox}>
                    <p>{companyData.name}</p>
                    <p>NIP: {companyData.nip}</p>
                    <p>REGON: {companyData.regon}</p>
                    <p>Adres: {branchData?.address}, {branchData?.postCode}, {branchData?.city}</p>
                </div>
                <p className={style.paragraph}>§ 1</p>
                <p>Przedmiotem niniejszym umowy jest przeniesienie na Kupującego prawa
                    własności pojazdu: </p>
                <p> {car.mark} {car.model} rok produkcji: {car.yearProduction} nr. rejestracyjny: {car.registration}</p>
                <p>nr VIN: {car.vin} przebieg: {car.mileage} km </p>
                <p className={style.paragraph}>§ 2</p>
                <p>Sprzedający oświadcza, że pojazd będący przedmiotem umowy stanowi jego wyłączną własność, jest wolny
                    od wad prawnych oraz praw osób trzecich, że nie toczy się żadne postępowanie, którego przedmiotem
                    jest
                    ten pojazd, że nie stanowi on również przedmiotu zabezpieczenia. </p>
                <p className={style.paragraph}>§ 3</p>
                <p>Strony ustaliły wartość przedmiotu umowy na kwotę: {consumer.price} zł.</p><p>
                słownie: {consumer.priceInWords} Polskich złotych</p>
                <p className={style.paragraph}>§ 4</p>
                <p>Sprzedający przenosi na rzecz kupującego własność pojazdu określonego w §1 niniejszej umowy za kwotę
                    określoną w §3 niniejszej umowy, której otrzymanie sprzedający kwituje. Kupujący kwituje
                    jednocześnie
                    odbiór pojazdu. </p>
                <p className={style.paragraph}>§ 5</p>
                <p>Sprzedający oświadcza, że pojazd nie ma wad technicznych, które są mu znane i o których nie
                    powiadomił
                    Kupującego, a Kupujący potwierdza znajomość stanu technicznego pojazdu.</p>
                <p className={style.paragraph}>§ 6</p>
                <p>Strony ustaliły, że wszelkiego rodzaju koszty transakcji wynikające z realizacji ustaleń niniejszej
                    umowy oraz koszty opłaty skarbowej obciążają kupującego. </p>
                <p className={style.paragraph}>§ 7</p>
                <p>W sprawach nie uregulowanych w niniejszej umowie zastosowanie mają obowiązujące w tym
                    zakresie przepisy Kodeksu Cywilnego. </p>
                <p className={style.paragraph}>§ 8</p>
                <p>Niniejszą umowę sporządzono w dwóch jednobrzmiących egzemplarzach, po jednym dla każdej ze stron.</p>
                <div className={style.signature}>
                    <p>Sprzedający</p>
                    <p>Kupujący</p>
                </div>
            </div>
        </div>
    );
};