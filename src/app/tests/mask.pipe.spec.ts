import { MaskPipe } from '../pipes/mask.pipe';
import { ScoreService } from '../services/score.service';

describe('MaskPipe', () => {
    let scoreService: ScoreService;
    const maskPipe = new MaskPipe(scoreService);

    it('should hide everything when no letters selected', () => {
        const masked = maskPipe.transform('ANGULAR', '');
        expect(masked).toBe('*******');
    });

    it('should reveal only the selected letter', () => {
        const masked = maskPipe.transform('ANGULAR', 'A');
        expect(masked).toBe('A****A*');
    });

    it('should reveal only the selected letter', () => {
        const masked = maskPipe.transform('ANGULAR', 'ABCL');
        expect(masked).toBe('A***LA*');
    });
    
    it('should reveal everything when all letters are selected', () => {
        const masked = maskPipe.transform('ANGULAR', 'ANGULR');
        expect(masked).toBe('ANGULAR');
    });

});