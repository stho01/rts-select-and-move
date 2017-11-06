export interface IUpdateable {
    update(dt: number): void;
    dispose(): void;
}