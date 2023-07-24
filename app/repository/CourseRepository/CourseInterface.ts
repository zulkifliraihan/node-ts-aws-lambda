interface CourseInterface {
    getData(): Promise <object[]>
    createData(data: any): Promise <object>
    detailData(id: number): Promise <any>
    updateData(id: number, data: any): Promise <any>
    deleteData(id: number, include: object | null): Promise <any>
    getDataReady(): Promise <object[]>
}

export default CourseInterface
