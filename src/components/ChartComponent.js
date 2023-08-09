import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { Col, Container, Row } from "react-bootstrap";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Tem Line Chart",
        },
    },
};

const labels = ["1", "2", "3", "4", "5", "6", "7"];

export const dataTem = {
    labels,
    datasets: [
        {
            label: "Temperature",
            data: labels.map(() => faker.datatype.number({ min: 10, max: 30.006 })),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
    ],
};

export const dataHum = {
    labels,
    datasets: [
        {
            label: "humidity",
            data: labels.map(() => faker.datatype.number({ min: 60, max: 90 })),
            borderColor: "rgb(53, 162, 23)",
            backgroundColor: "rgba(53, 162, 23, 0.5)",
        },
    ],
};
export const dataBri = {
    labels,
    datasets: [
        {
            label: "brightness",
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

export default function ChartComponent() {
    return (
        <Container>
            <Row>
                <Col>
                    <Line options={options} data={dataTem} updateMode="resize" />
                </Col>
                <Col>
                    <Line options={options} data={dataHum} updateMode="resize" />
                </Col>
                <Col>
                    <Line options={options} data={dataBri} updateMode="resize" />
                </Col>
            </Row>
        </Container>
    );
    // return <Line options={options} data={data} updateMode="resize" />;
    // return <Line options={options} data={data} updateMode="resize" />;
}
